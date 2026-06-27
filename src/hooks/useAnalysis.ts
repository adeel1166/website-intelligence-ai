import { useState, useCallback } from 'react';
import {
  WebsiteAnalysis,
  AnalysisStatus,
  AnalysisProgress,
  AnalysisHistoryItem,
} from '@/types/analysis';
import { generateFallbackAnalysis } from '@/utils/fallback-analyzer';
import { useLocalStorage } from './useLocalStorage';

const TOTAL_STEPS = 7;
const STEP_LABELS = [
  'Connecting to website...',
  'Extracting metadata...',
  'Understanding business model...',
  'Finding competitors...',
  'Checking trust signals...',
  'Evaluating conversion funnel...',
  'Generating intelligence report...',
];

export function useAnalysis() {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [result, setResult] = useState<WebsiteAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string>('');

  const [history, setHistory] = useLocalStorage<AnalysisHistoryItem[]>('wia-history', []);

  const reset = useCallback(() => {
    setStatus('idle');
    setProgress(null);
    setResult(null);
    setError(null);
    setAnalyzedUrl('');
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const updateProgress = (step: number, label: string) => {
    setProgress({
      step,
      totalSteps: TOTAL_STEPS,
      currentStep: label,
      steps: STEP_LABELS.map((lbl, idx) => ({
        label: lbl,
        status: idx < step ? 'complete' : idx === step ? 'active' : 'pending',
      })),
    });
  };

  const analyze = useCallback(
    async (rawUrl: string) => {
      if (!rawUrl || !rawUrl.trim()) {
        setError('Please enter a website URL');
        setStatus('error');
        return;
      }

      setError(null);
      setStatus('analyzing');
      setResult(null);

      // Normalize URL
      let url = rawUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }

      setAnalyzedUrl(url);

      try {
        // Step 1: Connecting
        updateProgress(0, STEP_LABELS[0]!);
        
        let scrapedData: any = null;

        // Try calling server-side /api/analyze Scraper
        try {
          const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          if (response.ok) {
            scrapedData = await response.json();
          } else {
            const errJson = await response.json();
            throw new Error(errJson.error || 'Server Scraper endpoint failed');
          }
        } catch (apiErr: any) {
          console.warn('Scraper API failed, attempting CORS proxy client parser:', apiErr);
          // Client-side CORS Proxy Fallback
          let htmlContent = '';
          try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            if (response.ok) {
              htmlContent = await response.text();
            } else {
              throw new Error('AllOrigins proxy failed');
            }
          } catch {
            const backupProxy = `https://corsproxy.io/?${encodeURIComponent(url)}`;
            const response = await fetch(backupProxy);
            if (response.ok) {
              htmlContent = await response.text();
            } else {
              throw new Error('CORS proxies failed. Unable to fetch website HTML.');
            }
          }

          // Import parser dynamically to inspect HTML client side
          const { parseHTMLContent } = await import('@/utils/analyzer');
          const extracted = parseHTMLContent(htmlContent, url);
          
          scrapedData = {
            url: extracted.url,
            domain: new URL(extracted.url).hostname.replace('www.', ''),
            title: extracted.title,
            description: extracted.description,
            canonicalUrl: extracted.url,
            ogTags: extracted.metaTags || {},
            headings: extracted.headings,
            internalLinks: extracted.links.filter(l => !l.isExternal).map(l => l.href),
            socialLinks: extracted.socialLinks,
            techStack: extracted.techStack,
            wordCount: extracted.wordCount,
            totalImages: extracted.images.length,
            missingAltImages: extracted.images.filter(i => !i.alt).length,
            features: {
              hasPricingPage: extracted.hasPricingPage,
              hasLoginPage: extracted.hasLoginPage,
              hasSignupPage: extracted.hasSignupPage,
              hasPrivacyPolicy: extracted.hasPrivacyPolicy,
              hasTerms: extracted.hasTerms,
              hasContactPage: extracted.hasContactPage,
              hasAboutPage: extracted.hasAboutPage,
              hasBlog: extracted.hasBlog,
            },
          };
        }

        // Step 2: Extracting metadata
        updateProgress(1, STEP_LABELS[1]!);
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Step 3: Understanding business model
        updateProgress(2, STEP_LABELS[2]!);
        
        let businessModelRes: any = null;
        try {
          const response = await fetch('/api/business-model', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: scrapedData.title,
              description: scrapedData.description,
              techStack: scrapedData.techStack,
              features: scrapedData.features,
              wordCount: scrapedData.wordCount,
            }),
          });
          if (response.ok) businessModelRes = await response.json();
        } catch (err) {
          console.warn('Business model API failed, falling back to local heuristic:', err);
        }

        // Step 4: Finding competitors
        updateProgress(3, STEP_LABELS[3]!);
        
        let competitorsRes: any = null;
        try {
          const response = await fetch('/api/competitors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              domain: scrapedData.domain,
              category: scrapedData.description?.toLowerCase().includes('shop') ? 'Ecommerce Platform' : 'SaaS Platform',
              title: scrapedData.title,
              description: scrapedData.description,
            }),
          });
          if (response.ok) competitorsRes = await response.json();
        } catch (err) {
          console.warn('Competitors API failed, falling back to local list:', err);
        }

        // Step 5: Checking trust signals
        updateProgress(4, STEP_LABELS[4]!);
        
        let trustRes: any = null;
        try {
          const response = await fetch('/api/trust', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: scrapedData.url,
              features: scrapedData.features,
              socialLinks: scrapedData.socialLinks,
            }),
          });
          if (response.ok) trustRes = await response.json();
        } catch (err) {
          console.warn('Trust API failed, falling back:', err);
        }

        // Step 6: Evaluating conversion funnel
        updateProgress(5, STEP_LABELS[5]!);
        
        let seoRes: any = null;
        try {
          const response = await fetch('/api/seo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: scrapedData.title,
              description: scrapedData.description,
              canonicalUrl: scrapedData.canonicalUrl,
              headings: scrapedData.headings,
              internalLinks: scrapedData.internalLinks,
              wordCount: scrapedData.wordCount,
              totalImages: scrapedData.totalImages,
              missingAltImages: scrapedData.missingAltImages,
            }),
          });
          if (response.ok) seoRes = await response.json();
        } catch (err) {
          console.warn('SEO API failed:', err);
        }

        // Step 7: Generating report
        updateProgress(6, STEP_LABELS[6]!);
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Merge API Responses using Local Fallback Generator as the baseline
        const baseReport = generateFallbackAnalysis({
          url: scrapedData.url,
          title: scrapedData.title,
          description: scrapedData.description,
          headings: scrapedData.headings,
          metaTags: scrapedData.ogTags || {},
          links: scrapedData.internalLinks.map((l: string) => ({ href: l, text: '', isExternal: false })),
          images: Array.from({ length: scrapedData.totalImages }).map(() => ({ src: '', alt: '' })),
          scripts: [],
          stylesheets: [],
          hasSSL: scrapedData.url.startsWith('https://'),
          hasPricingPage: scrapedData.features.hasPricingPage,
          hasLoginPage: scrapedData.features.hasLoginPage,
          hasSignupPage: scrapedData.features.hasSignupPage,
          hasPrivacyPolicy: scrapedData.features.hasPrivacyPolicy,
          hasTerms: scrapedData.features.hasTerms,
          hasContactPage: scrapedData.features.hasContactPage,
          hasAboutPage: scrapedData.features.hasAboutPage,
          hasBlog: scrapedData.features.hasBlog,
          socialLinks: scrapedData.socialLinks,
          techStack: scrapedData.techStack,
          structuredData: [],
          textContent: '',
          wordCount: scrapedData.wordCount,
          formCount: 0,
          ctaCount: 0,
          testimonialCount: 0,
        });

        // Merge in Server API updates
        const mergedReport: WebsiteAnalysis = {
          ...baseReport,
          businessModel: businessModelRes || baseReport.businessModel,
          competitors: competitorsRes?.competitors || baseReport.competitors,
          trustAnalysis: trustRes || baseReport.trustAnalysis,
          seoAnalysis: seoRes || baseReport.seoAnalysis,
        };

        // Recalculate health score average based on real server scores
        const finalSeo = mergedReport.seoAnalysis.score;
        const finalTrust = mergedReport.trustAnalysis.trustScore;
        const finalDesign = mergedReport.healthScore.design.score;
        const finalConversion = mergedReport.healthScore.conversion.score;
        const finalPerf = mergedReport.healthScore.performance.score;
        const finalAccess = mergedReport.healthScore.accessibility.score;

        mergedReport.healthScore = {
          overall: Math.round((finalSeo + finalTrust + finalDesign + finalConversion + finalPerf + finalAccess) / 6),
          design: mergedReport.healthScore.design,
          trust: { score: finalTrust, label: 'Trust Indicators', details: 'Presence of security certificates, support methods, and legal policies.' },
          conversion: mergedReport.healthScore.conversion,
          seo: { score: finalSeo, label: 'SEO Optimization', details: 'Structure of heading indexes, tag descriptions, and indexing settings.' },
          performance: mergedReport.healthScore.performance,
          accessibility: mergedReport.healthScore.accessibility,
        };

        setResult(mergedReport);
        setStatus('complete');

        // Store history
        const newItem: AnalysisHistoryItem = {
          id: Math.random().toString(36).substring(7),
          url: mergedReport.url,
          domain: mergedReport.domain,
          analyzedAt: mergedReport.analyzedAt,
          websiteName: mergedReport.executiveSummary.websiteName,
          overallScore: mergedReport.healthScore.overall,
        };

        setHistory((prev: AnalysisHistoryItem[]) => {
          const filtered = prev.filter((item) => item.url !== url);
          return [newItem, ...filtered].slice(0, 20);
        });

      } catch (err: any) {
        console.error('Analysis pipeline failed:', err);
        setError(err.message || 'Analysis failed. Please check the URL and try again.');
        setStatus('error');
      }
    },
    [setHistory]
  );

  return {
    status,
    progress,
    result,
    error,
    analyze,
    reset,
    history,
    clearHistory,
    analyzedUrl,
  };
}
