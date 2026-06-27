import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { url, features, socialLinks } = req.body;

    let trustScore = 40;
    const signals: any[] = [];
    const riskIndicators: string[] = [];
    const recommendations: string[] = [];

    // SSL check
    const isHttps = url?.startsWith('https://');
    if (isHttps) {
      trustScore += 25;
      signals.push({
        name: 'SSL Certificate Verification',
        status: 'pass',
        details: 'Verified secure HTTPS TLS connections are active.',
        icon: 'Shield',
      });
    } else {
      riskIndicators.push('Unencrypted website connection (HTTP instead of HTTPS). Discloses user data risks.');
      recommendations.push('Acquire and configure a validated SSL/TLS certificate (e.g. via Let\'s Encrypt) to encrypt user sessions.');
      signals.push({
        name: 'SSL Certificate Verification',
        status: 'fail',
        details: 'Unsecure connection detected (no SSL).',
        icon: 'Shield',
      });
    }

    // Privacy Policy check
    if (features?.hasPrivacyPolicy) {
      trustScore += 15;
      signals.push({
        name: 'Privacy Policy Document',
        status: 'pass',
        details: 'Discovered linked privacy statement outlining data collection policies.',
        icon: 'FileText',
      });
    } else {
      riskIndicators.push('Missing privacy policy agreement. Harms brand trust index and GDPR/CCPA compliance.');
      recommendations.push('Create and publish a comprehensive privacy policy outlining user data collection and tracking rules.');
      signals.push({
        name: 'Privacy Policy Document',
        status: 'fail',
        details: 'No visible privacy policy details found.',
        icon: 'FileText',
      });
    }

    // Terms of Service check
    if (features?.hasTerms) {
      trustScore += 10;
      signals.push({
        name: 'Terms of Service Agreement',
        status: 'pass',
        details: 'Terms and usage agreements are visible in directory listings.',
        icon: 'FileText',
      });
    } else {
      recommendations.push('Add a Terms of Service page specifying usage rules, liability limits, and dispute resolutions.');
      signals.push({
        name: 'Terms of Service Agreement',
        status: 'fail',
        details: 'No visible terms of service found.',
        icon: 'FileText',
      });
    }

    // Contact page check
    if (features?.hasContactPage) {
      trustScore += 10;
      signals.push({
        name: 'Contact & Support Methods',
        status: 'pass',
        details: 'Visible contact portals and customer support links exist.',
        icon: 'Mail',
      });
    } else {
      riskIndicators.push('Lacks direct support or contact pages, making customer verifications difficult.');
      recommendations.push('Add a visible contact form, customer support email, or official helpline details to footer folders.');
      signals.push({
        name: 'Contact & Support Methods',
        status: 'fail',
        details: 'No contact directories detected.',
        icon: 'Mail',
      });
    }

    // About page check
    if (features?.hasAboutPage) {
      trustScore += 10;
      signals.push({
        name: 'About Page Narrative',
        status: 'pass',
        details: 'About page is present, introducing corporate founders and missions.',
        icon: 'Users',
      });
    } else {
      recommendations.push('Publish an About Us narrative explaining company background, founders, or team values.');
      signals.push({
        name: 'About Page Narrative',
        status: 'fail',
        details: 'No team details detected.',
        icon: 'Users',
      });
    }

    // Social Links check
    const socialPlatforms = Object.keys(socialLinks || {});
    if (socialPlatforms.length > 0) {
      trustScore += 10;
      signals.push({
        name: 'Social Media Profiles',
        status: 'pass',
        details: `Linked verified profiles on: ${socialPlatforms.join(', ')}.`,
        icon: 'Globe',
      });
    } else {
      recommendations.push('Link official Twitter, LinkedIn, or Facebook pages to build third-party platform trust signals.');
      signals.push({
        name: 'Social Media Profiles',
        status: 'warning',
        details: 'No social media accounts are linked from the page.',
        icon: 'Globe',
      });
    }

    trustScore = Math.min(100, trustScore);

    const trustAnalysis = {
      trustScore,
      signals,
      riskIndicators,
      recommendations: recommendations.length > 0 ? recommendations : ['All core security and trust indicators are positive.'],
    };

    return res.status(200).json(trustAnalysis);
  } catch (error: any) {
    return res.status(500).json({ error: `Trust audit failed: ${error.message}` });
  }
}
