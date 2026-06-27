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
    const { title, description, techStack, features, wordCount } = req.body;

    const lowText = `${title} ${description}`.toLowerCase();
    const streams: { name: string; type: string; confidence: number; description: string }[] = [];

    // 1. Subscription SaaS / Freemium
    if (features?.hasPricingPage || lowText.includes('pricing') || lowText.includes('subscription') || lowText.includes('plan')) {
      const confidence = techStack?.includes('Stripe') ? 95 : 85;
      streams.push({
        name: 'Subscription SaaS',
        type: 'subscription',
        confidence,
        description: 'Generates recurring monthly or annual license fees for platform access.',
      });

      if (features?.hasSignupPage || lowText.includes('free trial') || lowText.includes('start free')) {
        streams.push({
          name: 'Freemium Tier Model',
          type: 'freemium',
          confidence: Math.round(confidence * 0.9),
          description: 'Offers free tier utility to seed self-serve acquisition, upgrading users to paid tiers.',
        });
      }
    }

    // 2. Ecommerce
    if (techStack?.includes('Shopify') || lowText.includes('shop') || lowText.includes('store') || lowText.includes('cart') || lowText.includes('product')) {
      const confidence = techStack?.includes('Shopify') ? 98 : 75;
      streams.push({
        name: 'Direct E-commerce Sales',
        type: 'ecommerce',
        confidence,
        description: 'Processes online checkouts for physical or digital products directly.',
      });
    }

    // 3. Marketplace / Commission
    if (lowText.includes('marketplace') || lowText.includes('stay') || lowText.includes('rent') || lowText.includes('booking') || lowText.includes('hire')) {
      streams.push({
        name: 'Marketplace Transactions',
        type: 'marketplace',
        confidence: 85,
        description: 'Earns commission transaction cuts or placement fees matching buyers and sellers.',
      });
    }

    // 4. Advertising / Sponsored Content
    if (features?.hasBlog || lowText.includes('news') || lowText.includes('article') || lowText.includes('magazine') || lowText.includes('advertise')) {
      streams.push({
        name: 'Display Advertising',
        type: 'advertising',
        confidence: 70,
        description: 'Monetizes user attention through contextual ads, sponsors, or premium advertorial placements.',
      });
    }

    // 5. Affiliate
    if (lowText.includes('affiliate') || lowText.includes('recommend') || lowText.includes('deals') || lowText.includes('reviews')) {
      streams.push({
        name: 'Affiliate Commissions',
        type: 'affiliate',
        confidence: 75,
        description: 'Directs consumer leads to secondary platforms, earning click commissions.',
      });
    }

    // 6. Lead Generation / Service Business
    if (features?.hasContactPage || lowText.includes('service') || lowText.includes('agency') || lowText.includes('consult') || lowText.includes('bespoke')) {
      streams.push({
        name: 'Professional Services / Lead Gen',
        type: 'service',
        confidence: 80,
        description: 'Quotes custom setup, design, integration, or support contracts for enterprise clients.',
      });
    }

    // Fallbacks
    if (streams.length === 0) {
      streams.push({
        name: 'Subscription SaaS',
        type: 'subscription',
        confidence: 60,
        description: 'Recurring monthly licensing structure for platform utilities.',
      });
      streams.push({
        name: 'Consulting & Setup',
        type: 'service',
        confidence: 50,
        description: 'Bespoke integration and support services.',
      });
    }

    // Sort by confidence
    streams.sort((a, b) => b.confidence - a.confidence);

    // Pricing strategy and target profile deduction
    let pricingStrategy = 'Tiered Subscription Model';
    let customerType = 'B2B (Business Clients)';
    let acquisitionChannels = ['Organic SEO Searches', 'Direct Word of Mouth'];

    if (streams.some(s => s.type === 'ecommerce')) {
      pricingStrategy = 'Product Unit Pricing';
      customerType = 'B2C (Direct Consumer)';
      acquisitionChannels = ['Social Ad Campaigns', 'Affiliate referrals'];
    } else if (streams.some(s => s.type === 'marketplace')) {
      pricingStrategy = 'Dynamic Transaction Commissions';
      customerType = 'Peer-to-Peer Platforms';
      acquisitionChannels = ['Organic Search (SEO)', 'Paid Search Ads'];
    }

    const resBody = {
      primaryRevenue: streams[0],
      secondaryRevenue: streams.slice(1),
      pricingStrategy,
      customerType,
      acquisitionChannels,
      howItMakesMoney: `Inferred to monetize primary channels via ${streams[0]?.name.toLowerCase()} supported by optional adjacent revenue pools.`,
      allStreams: streams,
    };

    return res.status(200).json(resBody);
  } catch (error: any) {
    return res.status(500).json({ error: `Failed to detect business model: ${error.message}` });
  }
}
