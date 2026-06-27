import { ExtractedWebData } from '@/types/analysis';

export function parseHTMLContent(html: string, url: string): ExtractedWebData {
  const result: ExtractedWebData = {
    url,
    title: '',
    description: '',
    headings: [],
    metaTags: {},
    links: [],
    images: [],
    scripts: [],
    stylesheets: [],
    hasSSL: url.startsWith('https://'),
    hasPricingPage: false,
    hasLoginPage: false,
    hasSignupPage: false,
    hasPrivacyPolicy: false,
    hasTerms: false,
    hasContactPage: false,
    hasAboutPage: false,
    hasBlog: false,
    socialLinks: {},
    techStack: [],
    structuredData: [],
    textContent: '',
    wordCount: 0,
    formCount: 0,
    ctaCount: 0,
    testimonialCount: 0,
  };

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Basic details
    result.title = doc.querySelector('title')?.textContent?.trim() || '';

    // Meta tags
    const metas = doc.querySelectorAll('meta');
    metas.forEach((meta) => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      if (name && content) {
        result.metaTags[name] = content;
        if (name === 'description') result.description = content;
        if (name === 'og:title') result.ogTitle = content;
        if (name === 'og:description') result.ogDescription = content;
        if (name === 'og:image') result.ogImage = content;
      }
    });

    // Description fallback
    if (!result.description && result.ogDescription) {
      result.description = result.ogDescription;
    }

    // Favicon detection
    const faviconLink = doc.querySelector("link[rel*='icon']");
    if (faviconLink) {
      let href = faviconLink.getAttribute('href') || '';
      if (href && !href.startsWith('http')) {
        const parsedUrl = new URL(url);
        href = `${parsedUrl.origin}${href.startsWith('/') ? '' : '/'}${href}`;
      }
      result.favicon = href;
    } else {
      const parsedUrl = new URL(url);
      result.favicon = `${parsedUrl.origin}/favicon.ico`;
    }

    // Headings
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headingElements.forEach((h) => {
      const text = h.textContent?.trim() || '';
      const level = parseInt(h.tagName.substring(1), 10);
      if (text && level) {
        result.headings.push({ level, text });
      }
    });

    // Links
    const linkElements = doc.querySelectorAll('a');
    linkElements.forEach((a) => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent?.trim() || '';
      if (href) {
        const isExternal = href.startsWith('http') && !href.includes(new URL(url).hostname);
        result.links.push({ href, text, isExternal });

        // Feature detection based on URL
        const lowHref = href.toLowerCase();
        const lowText = text.toLowerCase();

        if (lowHref.includes('pricing') || lowText.includes('pricing') || lowText.includes('plan')) {
          result.hasPricingPage = true;
        }
        if (lowHref.includes('login') || lowHref.includes('signin') || lowText.includes('log in') || lowText.includes('sign in')) {
          result.hasLoginPage = true;
        }
        if (lowHref.includes('signup') || lowHref.includes('register') || lowText.includes('sign up') || lowText.includes('create account') || lowText.includes('try free')) {
          result.hasSignupPage = true;
        }
        if (lowHref.includes('privacy') || lowText.includes('privacy policy')) {
          result.hasPrivacyPolicy = true;
        }
        if (lowHref.includes('terms') || lowText.includes('terms of service') || lowText.includes('terms & conditions')) {
          result.hasTerms = true;
        }
        if (lowHref.includes('contact') || lowText.includes('contact us') || lowText.includes('support')) {
          result.hasContactPage = true;
        }
        if (lowHref.includes('about') || lowText.includes('about us') || lowText.includes('our story')) {
          result.hasAboutPage = true;
        }
        if (lowHref.includes('blog') || lowText.includes('blog') || lowText.includes('articles')) {
          result.hasBlog = true;
        }

        // Social Links
        const socialPlatforms = ['twitter.com', 'x.com', 'facebook.com', 'linkedin.com', 'github.com', 'instagram.com', 'youtube.com'];
        socialPlatforms.forEach((platform) => {
          if (lowHref.includes(platform)) {
            const name = platform.split('.')[0] || 'social';
            result.socialLinks[name] = href;
          }
        });
      }
    });

    // Images
    const imgElements = doc.querySelectorAll('img');
    imgElements.forEach((img) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      if (src) {
        result.images.push({ src, alt });
      }
    });

    // Scripts
    const scriptElements = doc.querySelectorAll('script');
    scriptElements.forEach((script) => {
      const src = script.getAttribute('src');
      if (src) {
        result.scripts.push(src);
        
        // Tech stack checks
        const lowSrc = src.toLowerCase();
        if (lowSrc.includes('react')) result.techStack.push('React');
        if (lowSrc.includes('vue')) result.techStack.push('Vue.js');
        if (lowSrc.includes('angular')) result.techStack.push('Angular');
        if (lowSrc.includes('next.js') || lowSrc.includes('_next')) result.techStack.push('Next.js');
        if (lowSrc.includes('gatsby')) result.techStack.push('Gatsby');
        if (lowSrc.includes('nuxt')) result.techStack.push('Nuxt.js');
        if (lowSrc.includes('shopify')) result.techStack.push('Shopify');
        if (lowSrc.includes('wordpress') || lowSrc.includes('wp-content')) result.techStack.push('WordPress');
      }

      // Parse JSON-LD Structured Data
      if (script.getAttribute('type') === 'application/ld+json') {
        try {
          const parsed = JSON.parse(script.textContent || '');
          if (Array.isArray(parsed)) {
            result.structuredData.push(...parsed);
          } else {
            result.structuredData.push(parsed);
          }
        } catch {
          // ignore invalid json-ld
        }
      }
    });

    // Stylesheets
    const linkStyles = doc.querySelectorAll("link[rel='stylesheet']");
    linkStyles.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        result.stylesheets.push(href);
        const lowHref = href.toLowerCase();
        if (lowHref.includes('tailwind')) result.techStack.push('Tailwind CSS');
        if (lowHref.includes('bootstrap')) result.techStack.push('Bootstrap');
      }
    });

    // Forms
    result.formCount = doc.querySelectorAll('form').length;

    // Text Content & Word Count
    const textEl = doc.body || doc.documentElement;
    result.textContent = textEl.innerText || textEl.textContent || '';
    result.wordCount = result.textContent.trim().split(/\s+/).filter(Boolean).length;

    // CTA Count estimation
    const ctaKeywords = ['sign up', 'register', 'get started', 'try for free', 'buy now', 'purchase', 'subscribe', 'demo', 'book a', 'create account', 'start free'];
    const buttons = doc.querySelectorAll('button, a.btn, a.button');
    buttons.forEach((btn) => {
      const text = btn.textContent?.trim().toLowerCase() || '';
      if (ctaKeywords.some((keyword) => text.includes(keyword))) {
        result.ctaCount++;
      }
    });

    // Testimonial Count estimation
    const testimonialKeywords = ['testimonial', 'what our users say', 'happy customer', 'success story', 'review from', 'reviews', 'ratings'];
    const bodyHtml = doc.body?.innerHTML.toLowerCase() || '';
    testimonialKeywords.forEach((kw) => {
      const regex = new RegExp(kw, 'g');
      const matches = bodyHtml.match(regex);
      if (matches) {
        result.testimonialCount += matches.length;
      }
    });
    result.testimonialCount = Math.min(10, Math.floor(result.testimonialCount / 3)); // cap and average

    // Ensure unique techStack values
    result.techStack = Array.from(new Set(result.techStack));
    if (result.techStack.length === 0) {
      result.techStack.push('HTML5', 'CSS3', 'Modern Javascript');
    }

  } catch (e) {
    console.error('HTML parsing error:', e);
  }

  return result;
}
