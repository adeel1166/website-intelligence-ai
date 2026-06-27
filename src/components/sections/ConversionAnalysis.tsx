import React from 'react';
import { Target, CheckCircle2, XCircle, Lightbulb, Heading, PlayCircle, DollarSign, Edit3, Heart, Award, Map, RefreshCw, Layers } from 'lucide-react';
import { ConversionAnalysisData as ConversionType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';

interface ConversionAnalysisProps {
  data: ConversionType;
  isLoading: boolean;
}

export const ConversionAnalysis: React.FC<ConversionAnalysisProps> = ({
  data,
  isLoading,
}) => {
  const getScoreColorText = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const metrics = [
    { label: 'Value Proposition', data: data.headlineQuality, icon: Heading },
    { label: 'CTA Placements', data: data.ctaButtons, icon: PlayCircle },
    { label: 'Pricing Clarity', data: data.pricingStructure, icon: DollarSign },
    { label: 'Form Optimization', data: data.forms, icon: Edit3 },
    { label: 'Social Proof / Trust', data: data.socialProof, icon: Award },
    { label: 'Lead Magnets', data: data.leadMagnets, icon: Heart },
    { label: 'User Flow Clarity', data: data.userJourney, icon: Map },
    { label: 'Signup Friction', data: data.signupFriction, icon: RefreshCw },
    { label: 'Landing Structure', data: data.landingPageStructure, icon: Layers },
  ];

  return (
    <SectionWrapper
      id="conversion-analysis"
      title="Conversion Funnel Analysis"
      description="Funnel structures, call-to-actions, user onboarding, and social proof loops."
      icon={<Target className="w-5 h-5" />}
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
                    <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-155 dark:border-white/10 text-gray-500 dark:text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
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

        {/* What's Working, Hurting, Improve columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* What's Working */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
              <CheckCircle2 className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">What's Working</h4>
            </div>
            <ul className="space-y-3.5">
              {data.whatsWorking.map((str, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-emerald-500 select-none">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* What's Hurting */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-red-500 border-b border-red-500/10 pb-2">
              <XCircle className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">What's Hurting</h4>
            </div>
            <ul className="space-y-3.5">
              {data.whatsHurting.map((weak, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-red-500 select-none">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* How to Improve */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-primary-500 border-b border-primary-500/10 pb-2">
              <Lightbulb className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Improvement Roadmap</h4>
            </div>
            <ul className="space-y-3.5">
              {data.howToImprove.map((rec, idx) => (
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
