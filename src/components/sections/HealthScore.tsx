import React from 'react';
import { Gauge } from 'lucide-react';
import { HealthScoreAnalysis as HealthScoreType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';

interface HealthScoreProps {
  data: HealthScoreType;
  isLoading: boolean;
}

export const HealthScore: React.FC<HealthScoreProps> = ({
  data,
  isLoading,
}) => {
  const getInterpretation = (score: number) => {
    if (score >= 90) return { title: 'Excellent Performance', desc: 'Operating at peak technical and strategic efficiency. Excellent user trust and search rankings.', color: 'text-emerald-500' };
    if (score >= 75) return { title: 'Strong Profile', desc: 'Solid structures are in place. Minor improvements to performance or conversions will yield returns.', color: 'text-green-500' };
    if (score >= 60) return { title: 'Average Health', desc: 'Functional site with notable optimization gaps. Focus on SEO metadata and page load delays.', color: 'text-yellow-500' };
    if (score >= 40) return { title: 'Needs Attention', desc: 'Several critical vulnerabilities found, likely around trust policies or search crawls.', color: 'text-orange-500' };
    return { title: 'Critical Status', desc: 'Severe optimization gaps. Lacks core metadata, trust protocols, or visual CTAs.', color: 'text-red-500' };
  };

  const interpretation = getInterpretation(data.overall);

  return (
    <SectionWrapper
      id="health-score"
      title="Website Health Score"
      description="Platform performance audits broken down across six core pillars."
      icon={<Gauge className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Large Gauge */}
          <GlassCard variant="gradient" hoverable={false} className="border border-white/5 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Overall Audit Score
            </h4>
            <RadialGauge score={data.overall} label="Overall" size="lg" showLabel={false} />
            <div className="space-y-1">
              <h5 className={`font-black text-lg ${interpretation.color}`}>
                {interpretation.title}
              </h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[240px] mx-auto">
                {interpretation.desc}
              </p>
            </div>
          </GlassCard>

          {/* Right - Category Gauges Grid */}
          <div className="lg:col-span-2">
            <GlassCard hoverable={false} className="border border-white/5 h-full flex flex-col justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6">
                Metric Breakdown
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <RadialGauge score={data.design.score} label="Design" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.design.details}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <RadialGauge score={data.trust.score} label="Trust" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.trust.details}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <RadialGauge score={data.conversion.score} label="Conversion" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.conversion.details}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors pt-4 md:pt-2">
                  <RadialGauge score={data.seo.score} label="SEO" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.seo.details}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors pt-4 md:pt-2">
                  <RadialGauge score={data.performance.score} label="Performance" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.performance.details}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors pt-4 md:pt-2">
                  <RadialGauge score={data.accessibility.score} label="Accessibility" size="md" />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-medium max-w-[110px] text-center truncate">
                    {data.accessibility.details}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
