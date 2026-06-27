import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Shield, Eye, HelpCircle } from 'lucide-react';
import { AIInsight, AIInsight as InsightType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';

interface AIInsightsPanelProps {
  data: InsightType[];
  isLoading: boolean;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  data,
  isLoading,
}) => {
  const getCategoryStyles = (category: AIInsight['category']) => {
    switch (category) {
      case 'strength':
        return { icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
      case 'weakness':
        return { icon: AlertTriangle, color: 'text-red-500 bg-red-500/10 border-red-500/20' };
      case 'opportunity':
        return { icon: Target, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' };
      case 'risk':
        return { icon: Shield, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' };
      default:
        return { icon: Eye, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' };
    }
  };

  return (
    <SectionWrapper
      id="ai-insights"
      title="AI Insights Panel"
      description="Heuristics modeling and structural patterns discovered from page signatures."
      icon={<Brain className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Observations list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((ins) => {
            const styles = getCategoryStyles(ins.category);
            const Icon = styles.icon;

            return (
              <div
                key={ins.id}
                className="glass border border-white/5 rounded-2xl p-5 flex gap-4 items-start hover:border-primary-500/20 transition-all duration-300"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${styles.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
                      {ins.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-gray-400 dark:text-gray-550 uppercase">
                        Confidence:
                      </span>
                      <span className="font-mono text-[10px] font-black text-primary-500">
                        {ins.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                    {ins.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 italic mt-6">
          * Heuristic models represent estimates. Values do not indicate concrete private metrics.
        </p>
      </div>
    </SectionWrapper>
  );
};
