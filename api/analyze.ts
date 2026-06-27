import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cheerio from 'cheerio';

// In-memory cache keyed by normalized URL
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes cache

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check Cache
    const cachedItem = cache.get(normalizedUrl);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return res.status(200).json({ ...cachedItem.data, _cached: true });
    }

    // Fetch Page
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    let response: Response;
    try {
      response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        redirect: 'follow',
      });
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        return res.status(504).json({ error: 'Gateway Timeout: Website took too long to respond' });
      }
      return res.status(502).json({ error: `Bad Gateway: Failed to fetch target site - ${err.message}` });
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(502).json({ error: `Target website returned error status ${response.status}` });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Metadata Extraction
    const title = $('title').text().trim() || $('meta[property="og:title"]').attr('content')?.trim() || '';
    const description = $('meta[name="description"]').attr('content')?.trim() || $('meta[property="og:description"]').attr('content')?.trim() || '';
    const canonicalUrl = $('link[rel="canonical"]').attr('href')?.trim() || normalizedUrl;
    
    // Open Graph Tags
    const ogTags: Record<string, string> = {};
    $('meta[property^="og:"]').each((_, el) => {
      const prop = $(el).attr('property');
      const content = $(el).attr('content');
      if (prop && content) {
        ogTags[prop] = content;
      }
    });

    // Headings
    const headings: { level: number; text: string }[] = [];
    $('h1, h2, h3').each((_, el) => {
      const level = parseInt(el.name.substring(1), 10);
      const text = $(el).text().trim();
      if (text) headings.push({ level, text });
    });

    // Links & Directories
    const internalLinks: string[] = [];
    const socialLinks: Record<string, string> = {};
    const parsedDomain = new URL(normalizedUrl).hostname;

    let hasPricingPage = false;
    let hasLoginPage = false;
    let hasSignupPage = false;
    let hasPrivacyPolicy = false;
    let hasTerms = false;
    let hasContactPage = false;
    let hasAboutPage = false;
    let hasBlog = false;

    $('a').each((_, el) => {
      const href = $(el).attr('href')?.trim();
      const text = $(el).text().trim().toLowerCase();
      if (!href) return;

      try {
        const absoluteUrl = new URL(href, normalizedUrl);
        const lowHref = absoluteUrl.pathname.toLowerCase();

        // Separate Internal Links
        if (absoluteUrl.hostname === parsedDomain) {
          if (!internalLinks.includes(absoluteUrl.href) && internalLinks.length < 150) {
            internalLinks.push(absoluteUrl.href);
          }

          // Check Subpage Signatures
          if (lowHref.includes('pricing') || text.includes('pricing') || text.includes('plans')) hasPricingPage = true;
          if (lowHref.includes('login') || lowHref.includes('signin') || text.includes('log in') || text.includes('sign in')) hasLoginPage = true;
          if (lowHref.includes('signup') || lowHref.includes('register') || text.includes('sign up') || text.includes('create account')) hasSignupPage = true;
          if (lowHref.includes('privacy') || text.includes('privacy policy')) hasPrivacyPolicy = true;
          if (lowHref.includes('terms') || lowHref.includes('tos') || text.includes('terms of service') || text.includes('terms & conditions')) hasTerms = true;
          if (lowHref.includes('contact') || text.includes('contact us') || text.includes('support')) hasContactPage = true;
          if (lowHref.includes('about') || text.includes('about us') || text.includes('our story')) hasAboutPage = true;
          if (lowHref.includes('blog') || text.includes('blog') || text.includes('articles')) hasBlog = true;
        } else {
          // Social Links
          const platforms = ['twitter.com', 'x.com', 'facebook.com', 'linkedin.com', 'github.com', 'instagram.com', 'youtube.com'];
          platforms.forEach((plat) => {
            if (absoluteUrl.hostname.includes(plat)) {
              const name = plat.split('.')[0] || 'social';
              socialLinks[name] = absoluteUrl.href;
            }
          });
        }
      } catch {
        // Skip relative anchor hrefs that fail parsing
      }
    });

    // Tech Stack detection from HTML source signatures
    const techStack: string[] = [];
    const htmlString = html.toLowerCase();

    // Check script sources, global objects, tags
    const scriptSrcs: string[] = [];
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src');
      if (src) scriptSrcs.push(src.toLowerCase());
    });

    // React / Next.js
    if ($('#__NEXT_DATA__').length > 0 || scriptSrcs.some(s => s.includes('next.js') || s.includes('_next'))) {
      techStack.push('Next.js', 'React');
    } else if (htmlString.includes('react-root') || scriptSrcs.some(s => s.includes('react'))) {
      techStack.push('React');
    }

    // WordPress
    if (htmlString.includes('wp-content') || htmlString.includes('wp-includes') || $('meta[name="generator"]').attr('content')?.toLowerCase().includes('wordpress')) {
      techStack.push('WordPress');
    }

    // Shopify
    if (htmlString.includes('shopify.shop') || htmlString.includes('cdn.shopify.com') || scriptSrcs.some(s => s.includes('shopify'))) {
      techStack.push('Shopify');
    }

    // Stripe
    if (scriptSrcs.some(s => s.includes('stripe.com')) || htmlString.includes('stripe-')) {
      techStack.push('Stripe');
    }

    // Google Analytics / Tag Manager
    if (scriptSrcs.some(s => s.includes('googletagmanager.com') || s.includes('google-analytics.com')) || htmlString.includes('gtag(') || htmlString.includes('ga(')) {
      techStack.push('Google Analytics');
    }

    // Meta Pixel
    if (htmlString.includes('connect.facebook.net') || htmlString.includes('fbq(')) {
      techStack.push('Meta Pixel');
    }

    // Fallbacks
    if (techStack.length === 0) {
      techStack.push('HTML5', 'CSS3', 'Modern Javascript');
    }

    // Word Count & Image Alts audit
    let wordCount = 0;
    const textContent = $('body').text() || '';
    wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;

    let totalImages = 0;
    let missingAltImages = 0;
    $('img').each((_, el) => {
      totalImages++;
      const alt = $(el).attr('alt');
      if (!alt || !alt.trim()) {
        missingAltImages++;
      }
    });

    const parsedData = {
      url: normalizedUrl,
      domain: parsedDomain,
      title,
      description,
      canonicalUrl,
      ogTags,
      headings,
      internalLinks,
      socialLinks,
      techStack,
      wordCount,
      totalImages,
      missingAltImages,
      features: {
        hasPricingPage,
        hasLoginPage,
        hasSignupPage,
        hasPrivacyPolicy,
        hasTerms,
        hasContactPage,
        hasAboutPage,
        hasBlog,
      },
    };

    // Save to Cache
    cache.set(normalizedUrl, {
      data: parsedData,
      expiry: Date.now() + CACHE_TTL,
    });

    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('Scraping error:', error);
    return res.status(500).json({ error: `Server Scraping failed: ${error.message}` });
  }
}
