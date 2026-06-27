import React from 'react';
import { TrendingUp, Zap, Clock, Rocket } from 'lucide-react';
import { GrowthOpportunitiesData as OpportunitiesType, Opportunity } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface GrowthOpportunitiesProps {
  data: OpportunitiesType;
  isLoading: boolean;
}

export const GrowthOpportunities: React.FC<GrowthOpportunitiesProps> = ({
  data,
  isLoading,
}) => {
  const getImpactBadgeVariant = (val: string) => {
    switch (val) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getEffortBadgeVariant = (val: string) => {
    switch (val) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  const renderOpportunityCard = (opp: Opportunity) => {
    return (
      <div
        key={opp.title}
        className="p-4 bg-gray-50/50 dark:bg-white/5 border border-gray-150 dark:border-white/10 rounded-xl space-y-2 hover:border-primary-500/20 transition-colors"
      >
        <h5 className="font-bold text-xs text-gray-850 dark:text-gray-200">
          {opp.title}
        </h5>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
          {opp.description}
        </p>
        <div className="flex gap-2 pt-1 border-t border-gray-100 dark:border-white/5 mt-2">
          <Badge variant={getImpactBadgeVariant(opp.impact)} size="sm">
            Impact: {opp.impact}
          </Badge>
          <Badge variant={getEffortBadgeVariant(opp.effort)} size="sm">
            Effort: {opp.effort}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <SectionWrapper
      id="growth-opportunities"
      title="Growth Opportunities"
      description="Actionable strategic priorities categorized by complexity and development cycles."
      icon={<TrendingUp className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Wins */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
            <Zap className="w-4.5 h-4.5" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider">Quick Wins</h4>
          </div>
          <div className="space-y-4">
            {data.quickWins.map(renderOpportunityCard)}
          </div>
        </GlassCard>

        {/* Medium Term */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-yellow-500 border-b border-yellow-500/10 pb-2">
            <Clock className="w-4.5 h-4.5" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider">Medium Term</h4>
          </div>
          <div className="space-y-4">
            {data.mediumImprovements.map(renderOpportunityCard)}
          </div>
        </GlassCard>

        {/* Long Term */}
        <GlassCard hoverable={false} className="border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-blue-500 border-b border-blue-500/10 pb-2">
            <Rocket className="w-4.5 h-4.5" />
            <h4 className="font-extrabold text-xs uppercase tracking-wider">Long Term</h4>
          </div>
          <div className="space-y-4">
            {data.longTermOpportunities.map(renderOpportunityCard)}
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
