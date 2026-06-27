import React from 'react';
import { Search, CheckCircle2, XCircle, AlertTriangle, Lightbulb, Info } from 'lucide-react';
import { SEOAnalysisData as SEOType, SEOItem } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';

interface SEOAnalysisProps {
  data: SEOType;
  isLoading: boolean;
}

export const SEOAnalysis: React.FC<SEOAnalysisProps> = ({
  data,
  isLoading,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />;
    }
  };

  const seoChecklist = [
    { label: 'Meta Title & Description', item: data.metaTags },
    { label: 'Headings Structure (H1-H6)', item: data.headings },
    { label: 'Keyword Optimization', item: data.keywords },
    { label: 'Image Alt Tags', item: data.images },
    { label: 'Content Word Count', item: data.contentStructure },
    { label: 'Internal Link Strategy', item: data.internalLinks },
    { label: 'Structured Schema Markup', item: data.structuredData },
  ];

  return (
    <SectionWrapper
      id="seo-analysis"
      title="SEO Analysis"
      description="Meta tags, header architectures, image alt crawlability, and structured schema metrics."
      icon={<Search className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checklist Column */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard hoverable={false} className="border border-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-250 uppercase tracking-wider text-[10px]">
                    SEO Audit Checklist
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Indexing and search engine structural markers
                  </p>
                </div>
                <RadialGauge score={data.score} label="SEO Score" size="sm" />
              </div>

              {/* Checklist items */}
              <div className="space-y-4">
                {seoChecklist.map((c) => (
                  <div
                    key={c.label}
                    className="flex gap-3.5 items-start p-3 hover:bg-gray-50/50 dark:hover:bg-white/5 border border-transparent hover:border-gray-150 dark:hover:border-white/10 rounded-xl transition-all"
                  >
                    {getStatusIcon(c.item.status)}
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-250">
                          {c.label}
                        </span>
                        {c.item.value && (
                          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-550 truncate max-w-[200px]">
                            {c.item.value}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed">
                        {c.item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Issues & Recommendations */}
          <div className="space-y-6">
            {/* Issues */}
            {data.issues.length > 0 && (
              <GlassCard hoverable={false} className="border border-red-500/10 bg-red-500/[0.01] space-y-4">
                <div className="flex items-center gap-2 text-red-500 border-b border-red-500/10 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider">SEO Issues</h4>
                </div>
                <ul className="space-y-3">
                  {data.issues.map((issue, idx) => (
                    <li key={idx} className="flex gap-2 text-[11px] font-semibold text-red-500 leading-relaxed">
                      <span>•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Recommendations */}
            <GlassCard hoverable={false} className="border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-primary-500 border-b border-primary-500/10 pb-2">
                <Lightbulb className="w-4.5 h-4.5" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">SEO Recommendations</h4>
              </div>
              <ul className="space-y-3.5">
                {data.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                    <span className="text-primary-500 font-bold select-none">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
