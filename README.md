# Website Intelligence AI

> **Paste Any Website. Discover How It Works. Learn How It Makes Money.**

An AI-powered business intelligence platform that audits, analyzes, compares, and explains any public website. Built with React, TypeScript, Vite, and Tailwind CSS.

![Website Intelligence AI](https://img.shields.io/badge/Website_Intelligence-AI-6366F1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- 🔍 **Executive Summary** — What the website does, who it's for, and why people use it
- 💰 **Business Model Detector** — Detect revenue streams and monetization strategies
- 📊 **Website Health Score** — Overall score with 6 sub-category breakdowns
- 🎨 **Design Analysis** — Typography, spacing, visual hierarchy evaluation
- 🛡️ **Trust Analysis** — SSL, privacy policy, contact info, social presence
- 🎯 **Conversion Analysis** — CTAs, forms, user journey, signup friction
- 🔎 **SEO Analysis** — Meta tags, headings, structured data, keyword analysis
- ⚡ **Performance Analysis** — Core Web Vitals and performance indicators
- 👥 **Competitor Discovery** — Find similar websites with comparison data
- ⚔️ **Competitive Intelligence** — Strength/weakness comparison and roadmap
- 📈 **Growth Opportunities** — Quick wins, medium improvements, long-term goals
- 🔧 **Reverse Engineer** — How the business started and how to build something similar
- 📉 **Revenue Visualization** — Charts for revenue, customers, and acquisition
- 🧠 **AI Insights** — Smart observations about the business
- 📥 **Export** — PDF, JSON, clipboard, print, and shareable links

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/website-intelligence-ai.git
cd website-intelligence-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## AI Provider Setup (Optional)

The app works without AI keys using intelligent fallback analysis. For enhanced AI-powered analysis, set up one of these providers:

```bash
# Copy the example env file
cp .env.example .env

# Add your API key (only one is needed)
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AI...
OPENROUTER_API_KEY=sk-or-...
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| PDF Export | html2canvas + jsPDF |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

Or connect your GitHub repository to [netlify.com](https://netlify.com).

### Cloudflare Pages

```bash
# Install Wrangler CLI
npm i -g wrangler

# Deploy
wrangler pages deploy dist
```

### GitHub Pages

```bash
# Build the project
npm run build

# Deploy the dist/ folder to GitHub Pages
# Or use GitHub Actions (see .github/workflows/deploy.yml)
```

## Project Structure

```
website-intelligence-ai/
├── api/                          # Serverless functions
│   └── analyze.ts                # Main analysis endpoint
├── public/                       # Static assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── hero/                 # Landing page components
│   │   │   ├── HeroSection.tsx
│   │   │   └── AnalysisProgress.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── AppShell.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/             # Report section components
│   │   │   ├── ExecutiveSummary.tsx
│   │   │   ├── BusinessModelDetector.tsx
│   │   │   ├── HealthScore.tsx
│   │   │   ├── DesignAnalysis.tsx
│   │   │   ├── TrustAnalysis.tsx
│   │   │   ├── ConversionAnalysis.tsx
│   │   │   ├── SEOAnalysis.tsx
│   │   │   ├── PerformanceAnalysis.tsx
│   │   │   ├── CompetitorDiscovery.tsx
│   │   │   ├── CompetitiveIntelligence.tsx
│   │   │   ├── GrowthOpportunities.tsx
│   │   │   ├── ReverseEngineer.tsx
│   │   │   ├── RevenueVisualization.tsx
│   │   │   ├── AIInsightsPanel.tsx
│   │   │   └── ExportPanel.tsx
│   │   └── ui/                   # Shared UI components
│   │       ├── AnimatedBar.tsx
│   │       ├── Badge.tsx
│   │       ├── GlassCard.tsx
│   │       ├── Modal.tsx
│   │       ├── RadialGauge.tsx
│   │       ├── ScoreCard.tsx
│   │       ├── SectionWrapper.tsx
│   │       ├── SkeletonLoader.tsx
│   │       └── Tooltip.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAnalysis.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   └── useLocalStorage.ts
│   ├── types/                    # TypeScript definitions
│   │   └── analysis.ts
│   ├── utils/                    # Utility functions
│   │   ├── analyzer.ts
│   │   ├── export.ts
│   │   ├── fallback-analyzer.ts
│   │   └── theme.ts
│   ├── App.tsx                   # Root component
│   ├── index.css                 # Global styles
│   └── main.tsx                  # Entry point
├── .env.example
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── vite.config.ts
└── wrangler.toml
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/⌘ + K` | New Analysis |
| `Ctrl/⌘ + D` | Toggle Dark Mode |
| `Ctrl/⌘ + E` | Export Report |
| `Escape` | Close Modals |

## Important Notes

- All analysis is based on publicly available information
- All estimates are clearly labeled as AI-generated
- No private analytics or hidden data is accessed
- The app respects robots.txt and rate limits

## License

MIT License — feel free to use, modify, and distribute.
