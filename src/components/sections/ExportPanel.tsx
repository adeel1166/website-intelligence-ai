import React, { useState } from 'react';
import {
  Download,
  FileDown,
  FileJson,
  Copy,
  Printer,
  Share2,
  Trash2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { WebsiteAnalysis, AnalysisHistoryItem } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { exportToJSON, exportToPDF, copyToClipboard, printReport, generateShareLink } from '@/utils/export';
import { motion, AnimatePresence } from 'framer-motion';

interface ExportPanelProps {
  analysis: WebsiteAnalysis | null;
  history: AnalysisHistoryItem[];
  onClearHistory: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  analysis,
  history,
  onClearHistory,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopyText = async () => {
    if (!analysis) return;
    const ok = await copyToClipboard(analysis);
    if (ok) {
      triggerToast('Report summary copied to clipboard!');
    }
  };

  const handleShareLink = async () => {
    if (!analysis) return;
    const link = generateShareLink(analysis.url);
    try {
      await navigator.clipboard.writeText(link);
      triggerToast('Shareable link copied to clipboard!');
    } catch {
      triggerToast('Failed to copy share link.');
    }
  };

  return (
    <SectionWrapper
      id="export"
      title="Export & Share Report"
      description="Download report assets, copy summaries to your clipboard, or review audit history logs."
      icon={<Download className="w-5 h-5" />}
      isLoading={false}
    >
      <div className="space-y-6">
        {/* Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => analysis && exportToPDF(analysis)}
            disabled={!analysis}
            className="glass border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/20 hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50"
          >
            <div className="p-2 bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 rounded-xl group-hover:scale-110 transition-transform">
              <FileDown className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-850 dark:text-gray-200 block">Download PDF</span>
              <p className="text-[9px] text-gray-400 dark:text-gray-500">Vector layout report</p>
            </div>
          </button>

          <button
            onClick={() => analysis && exportToJSON(analysis)}
            disabled={!analysis}
            className="glass border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/20 hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50"
          >
            <div className="p-2 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 border border-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
              <FileJson className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-850 dark:text-gray-200 block">Export JSON</span>
              <p className="text-[9px] text-gray-400 dark:text-gray-500">Structured data payload</p>
            </div>
          </button>

          <button
            onClick={handleCopyText}
            disabled={!analysis}
            className="glass border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/20 hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50"
          >
            <div className="p-2 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform">
              <Copy className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-850 dark:text-gray-200 block">Copy Report</span>
              <p className="text-[9px] text-gray-400 dark:text-gray-500">Formatted text summary</p>
            </div>
          </button>

          <button
            onClick={printReport}
            disabled={!analysis}
            className="glass border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/20 hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50"
          >
            <div className="p-2 bg-cyan-500/10 text-cyan-500 dark:text-accent-400 border border-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-850 dark:text-gray-200 block">Print Page</span>
              <p className="text-[9px] text-gray-400 dark:text-gray-500">Standard document layout</p>
            </div>
          </button>

          <button
            onClick={handleShareLink}
            disabled={!analysis}
            className="glass border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary-500/20 hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50 col-span-2 md:col-span-1"
          >
            <div className="p-2 bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-gray-850 dark:text-gray-200 block">Share Link</span>
              <p className="text-[9px] text-gray-400 dark:text-gray-500">Copy URL state parameters</p>
            </div>
          </button>
        </div>

        {/* History list */}
        {history.length > 0 && (
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Audit History Logs
              </h4>
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Logs</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 text-xs font-semibold"
                >
                  <div className="space-y-0.5">
                    <span className="text-gray-850 dark:text-gray-200 block">
                      {item.websiteName || item.domain}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 block">
                      {new Date(item.analyzedAt).toLocaleDateString()} at{' '}
                      {new Date(item.analyzedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">
                      {item.overallScore} score
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 p-1 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>

      {/* Copy notification Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 glass border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-2xl z-50 text-xs font-bold"
          >
            <CheckCircle className="w-4.5 h-4.5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};
