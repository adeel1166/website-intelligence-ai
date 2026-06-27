import React from 'react';
import { Swords, TrendingUp, TrendingDown, Target, Zap, Clock, ShieldAlert } from 'lucide-react';
import { CompetitiveIntelligenceData as IntelType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';
import { Badge } from '@/components/ui/Badge';

interface CompetitiveIntelligenceProps {
  data: IntelType;
  isLoading: boolean;
}

export const CompetitiveIntelligence: React.FC<CompetitiveIntelligenceProps> = ({
  data,
  isLoading,
}) => {
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500 shrink-0" />;
      default:
        return <Zap className="w-4 h-4 text-emerald-500 shrink-0" />;
    }
  };

  return (
    <SectionWrapper
      id="competitive-intelligence"
      title="Competitive Intelligence Report"
      description="Benchmarking website metrics against competitor averages and mapping strategic positioning."
      icon={<Swords className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Score comparison gauges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard variant="gradient" hoverable={false} className="border border-white/5 flex flex-col sm:flex-row items-center justify-around p-8 lg:col-span-2 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary-500 dark:text-primary-400">
                Audited vs Market
              </span>
              <h4 className="font-extrabold text-lg text-gray-900 dark:text-white leading-tight max-w-[200px]">
                Market Position Comparison
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-[240px]">
                Auditing score outputs against estimated averages of top industry players.
              </p>
            </div>
            <div className="flex gap-8 items-center">
              <RadialGauge score={data.yourScore} label="Your Site" size="md" />
              <RadialGauge score={data.competitorAverage} label="Market Avg" size="md" />
            </div>
          </GlassCard>

          {/* Strength comparison overview */}
          <GlassCard hoverable={false} className="border border-white/5 flex flex-col justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Strength Comparisons
            </h4>
            <div className="space-y-4">
              {data.strengthComparison.map((item) => (
                <div key={item.area} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-gray-700 dark:text-gray-300">
                    <span>{item.area}</span>
                    <span className="font-mono text-primary-500">{item.yourScore} vs {item.competitorScore}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-primary-500 h-full rounded-l-full"
                      style={{ width: `${(item.yourScore / (item.yourScore + item.competitorScore)) * 100}%` }}
                    />
                    <div
                      className="bg-gray-300 dark:bg-white/20 h-full rounded-r-full"
                      style={{ width: `${(item.competitorScore / (item.yourScore + item.competitorScore)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Advantages / Disadvantages / Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Advantages */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
              <TrendingUp className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Competitive Advantages</h4>
            </div>
            <ul className="space-y-3.5">
              {data.advantages.map((adv, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-emerald-500 font-bold select-none">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Disadvantages */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-red-500 border-b border-red-500/10 pb-2">
              <TrendingDown className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Competitive Disadvantages</h4>
            </div>
            <ul className="space-y-3.5">
              {data.disadvantages.map((dis, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-red-500 font-bold select-none">•</span>
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Opportunities */}
          <GlassCard hoverable={false} className="border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-blue-500 border-b border-blue-500/10 pb-2">
              <Target className="w-4.5 h-4.5" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Growth Opportunities</h4>
            </div>
            <ul className="space-y-3.5">
              {data.opportunities.map((opp, idx) => (
                <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-blue-500 font-bold select-none">•</span>
                  <span>{opp}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Strategic Roadmap */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-6">
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5 pb-2">
              Strategic Improvement Roadmap
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              Phased action checklist to strengthen market positioning
            </p>
          </div>

          <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
            {data.improvementRoadmap.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/10 flex items-center justify-center shrink-0">
                  {getPriorityIcon(item.priority)}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="font-bold text-xs text-gray-850 dark:text-gray-200">
                      {item.title}
                    </h5>
                    <Badge variant={getPriorityBadgeVariant(item.priority)} size="sm">
                      {item.priority} priority
                    </Badge>
                    <Badge variant="default" size="sm">
                      {item.timeframe}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
