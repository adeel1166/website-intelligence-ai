import React from 'react';
import { Zap, Clock, Activity, ArrowUpCircle } from 'lucide-react';
import { PerformanceAnalysisData as PerformanceType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';

interface PerformanceAnalysisProps {
  data: PerformanceType;
  isLoading: boolean;
}

export const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({
  data,
  isLoading,
}) => {
  const getStatusColorBorder = (status: string) => {
    switch (status) {
      case 'good':
        return 'border-l-4 border-l-emerald-500';
      case 'needs-improvement':
        return 'border-l-4 border-l-yellow-500';
      default:
        return 'border-l-4 border-l-red-500';
    }
  };

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-500';
      case 'needs-improvement':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <SectionWrapper
      id="performance-analysis"
      title="Performance Analysis"
      description="Asset weight calculations, script evaluations, and Core Web Vitals indicators."
      icon={<Zap className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Overall Radial Gauge */}
          <GlassCard variant="gradient" hoverable={false} className="border border-white/5 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Performance Index
            </h4>
            <RadialGauge score={data.score} label="Performance" size="lg" showLabel={false} />
            <div className="space-y-1">
              <h5 className="font-black text-lg text-gray-900 dark:text-white leading-none">
                {data.score >= 85 ? 'Optimized Page' : data.score >= 60 ? 'Moderate Speeds' : 'Throttled Load Times'}
              </h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                Estimated page loading performance based on tag audits
              </p>
            </div>
          </GlassCard>

          {/* Right - Core Web Vitals simulation and indicators */}
          <div className="lg:col-span-2 space-y-6">
            {/* CWV panel */}
            <GlassCard hoverable={false} className="border border-white/5 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Core Web Vitals Estimates
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* LCP */}
                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-150 dark:border-white/10 flex flex-col justify-between h-[100px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                      LCP (Paint)
                    </span>
                    <span className="text-emerald-500 text-[10px] font-bold uppercase">Good</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black font-mono text-gray-800 dark:text-white">1.8</span>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">s</span>
                  </div>
                </div>

                {/* FID */}
                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-150 dark:border-white/10 flex flex-col justify-between h-[100px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                      FID (Delay)
                    </span>
                    <span className="text-emerald-500 text-[10px] font-bold uppercase">Good</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black font-mono text-gray-800 dark:text-white">45</span>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">ms</span>
                  </div>
                </div>

                {/* CLS */}
                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-150 dark:border-white/10 flex flex-col justify-between h-[100px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                      CLS (Shift)
                    </span>
                    <span className="text-emerald-500 text-[10px] font-bold uppercase">Good</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-black font-mono text-gray-800 dark:text-white">0.02</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Indicators grid & improvement suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metric cards list */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5 pb-2">
              Performance Markers
            </h4>
            <div className="space-y-4">
              {data.indicators.map((ind) => (
                <div
                  key={ind.name}
                  className={`p-3.5 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-between gap-4 ${getStatusColorBorder(
                    ind.status
                  )}`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-250 block">
                      {ind.name}
                    </span>
                    <p className="text-[9px] text-gray-500 dark:text-gray-400">
                      {ind.description}
                    </p>
                  </div>
                  <span className={`font-mono font-bold text-sm ${getStatusTextClass(ind.status)}`}>
                    {ind.value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Suggestions */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-500 dark:text-primary-400 border-b border-primary-500/10 pb-2">
              Optimization Suggestions
            </h4>
            <div className="space-y-4">
              {data.suggestions.map((sug, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <ArrowUpCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-medium text-gray-650 dark:text-gray-300 leading-relaxed">
                    {sug}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
};
