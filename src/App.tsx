import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/utils/theme';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { AppShell } from '@/components/layout/AppShell';
import { HeroSection } from '@/components/hero/HeroSection';
import { AnalysisProgress } from '@/components/hero/AnalysisProgress';
import { ExecutiveSummary } from '@/components/sections/ExecutiveSummary';
import { BusinessModelDetector } from '@/components/sections/BusinessModelDetector';
import { HealthScore } from '@/components/sections/HealthScore';
import { DesignAnalysis } from '@/components/sections/DesignAnalysis';
import { TrustAnalysis } from '@/components/sections/TrustAnalysis';
import { ConversionAnalysis } from '@/components/sections/ConversionAnalysis';
import { SEOAnalysis } from '@/components/sections/SEOAnalysis';
import { PerformanceAnalysis } from '@/components/sections/PerformanceAnalysis';
import { CompetitorDiscovery } from '@/components/sections/CompetitorDiscovery';
import { CompetitiveIntelligence } from '@/components/sections/CompetitiveIntelligence';
import { GrowthOpportunities } from '@/components/sections/GrowthOpportunities';
import { ReverseEngineer } from '@/components/sections/ReverseEngineer';
import { RevenueVisualization } from '@/components/sections/RevenueVisualization';
import { AIInsightsPanel } from '@/components/sections/AIInsightsPanel';
import { ExportPanel } from '@/components/sections/ExportPanel';

function AppContent() {
  const {
    status,
    progress,
    result,
    error,
    analyze,
    reset,
    history,
    clearHistory,
    analyzedUrl,
  } = useAnalysis();

  const [showExportModal, setShowExportModal] = useState(false);

  const handleAnalyze = useCallback(
    (url: string) => {
      analyze(url);
    },
    [analyze]
  );

  const handleHistoryClick = useCallback(
    (item: { url: string }) => {
      analyze(item.url);
    },
    [analyze]
  );

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      handler: () => {
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      key: 'e',
      ctrlKey: true,
      handler: () => {
        if (result) setShowExportModal((prev) => !prev);
      },
    },
    {
      key: 'Escape',
      handler: () => {
        setShowExportModal(false);
      },
    },
  ]);

  // Share link support: check URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedUrl = params.get('url');
    if (sharedUrl) {
      analyze(sharedUrl);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoading = status === 'analyzing';
  const showDashboard = status === 'complete' && result;
  const showHero = status === 'idle' || status === 'error';
  const showProgress = status === 'analyzing';

  return (
    <>
      <AnimatePresence mode="wait">
        {showHero && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection onAnalyze={handleAnalyze} isAnalyzing={isLoading} error={error} />
          </motion.div>
        )}

        {showProgress && progress && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnalysisProgress progress={progress} url={analyzedUrl} />
          </motion.div>
        )}

        {showDashboard && result && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AppShell
              onAnalyze={handleAnalyze}
              isAnalyzing={isLoading}
              history={history}
              onHistoryClick={handleHistoryClick}
              analysisComplete={true}
            >
              <div id="report-content" className="space-y-8 pb-24">
                <ExecutiveSummary data={result.executiveSummary} isLoading={false} />
                <BusinessModelDetector data={result.businessModel} isLoading={false} />
                <HealthScore data={result.healthScore} isLoading={false} />
                <DesignAnalysis data={result.designAnalysis} isLoading={false} />
                <TrustAnalysis data={result.trustAnalysis} isLoading={false} />
                <ConversionAnalysis data={result.conversionAnalysis} isLoading={false} />
                <SEOAnalysis data={result.seoAnalysis} isLoading={false} />
                <PerformanceAnalysis data={result.performanceAnalysis} isLoading={false} />
                <CompetitorDiscovery data={result.competitors} isLoading={false} />
                <CompetitiveIntelligence data={result.competitiveIntelligence} isLoading={false} />
                <GrowthOpportunities data={result.growthOpportunities} isLoading={false} />
                <ReverseEngineer data={result.reverseEngineer} isLoading={false} />
                <RevenueVisualization data={result.revenueVisualization} isLoading={false} />
                <AIInsightsPanel data={result.aiInsights} isLoading={false} />
                <ExportPanel
                  analysis={result}
                  history={history}
                  onClearHistory={clearHistory}
                />
              </div>
            </AppShell>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
