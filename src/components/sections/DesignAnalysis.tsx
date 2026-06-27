import React from 'react';
import { Palette, CheckCircle2, XCircle, Lightbulb, Type, Move, Layers, Navigation, Heart, BookOpen, Droplet, Smartphone, Target } from 'lucide-react';
import { DesignAnalysisData as DesignType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface DesignAnalysisProps {
  data: DesignType;
  isLoading: boolean;
}

export const DesignAnalysis: React.FC<DesignAnalysisProps> = ({
  data,
  isLoading,
}) => {
  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (status === 'good') return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (status === 'average') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  const getScoreColorText = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const metrics = [
    { label: 'Typography', data: data.typography, icon: Type },
    { label: 'Spacing / Grid', data: data.spacing, icon: Move },
    { label: 'Visual Hierarchy', data: data.visualHierarchy, icon: Layers },
    { label: 'Navigation Menu', data: data.navigation, icon: Navigation },
    { label: 'Brand Consistency', data: data.brandConsistency, icon: Heart },
    { label: 'Readability Scale', data: data.readability, icon: BookOpen },
    { label: 'Color Harmony', data: data.colorSystem, icon: Droplet },
    { label: 'Mobile Responsive', data: data.mobileResponsiveness, icon: Smartphone },
    { label: 'CTA Visibility', data: data.ctaVisibility, icon: Target },
  ];

  return (
    <SectionWrapper
      id="design-analysis"
      title="Design Analysis"
      description="Visual style systems, accessibility compliance, and structural layouts."
      icon={<Palette className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-primary-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-150 dark:border-white/10 text-gray-500 dark:text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-gray-850 dark:text-gray-250">
                      {m.label}
                    </span>
                  </div>
                  <span className={`font-mono font-black text-sm ${getScoreColorText(m.data.score)}`}>
                    {m.data.score}%
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed mt-3.5 italic">
                  "{m.data.notes}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Strengths, Weaknesses, Recommendations column list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
              <CheckCircle2 className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Visual Strengths</h4>
            </div>
            <ul className="space-y-3.5">
              {data.strengths.map((str, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-emerald-500 select-none">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Weaknesses */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-red-500 border-b border-red-500/10 pb-2">
              <XCircle className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Visual Weaknesses</h4>
            </div>
            <ul className="space-y-3.5">
              {data.weaknesses.map((weak, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-red-500 select-none">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Recommendations */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-primary-500 border-b border-primary-500/10 pb-2">
              <Lightbulb className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">UX Roadmap Suggestions</h4>
            </div>
            <ul className="space-y-3.5">
              {data.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-primary-500 select-none">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
};
