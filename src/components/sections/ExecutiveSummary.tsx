import React from 'react';
import { FileText, Building2, Users, Target, Globe, BarChart3, Info, Sparkles, HelpCircle } from 'lucide-react';
import { ExecutiveSummary as ExecutiveSummaryType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface ExecutiveSummaryProps {
  data: ExecutiveSummaryType;
  isLoading: boolean;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  data,
  isLoading,
}) => {
  return (
    <SectionWrapper
      id="executive-summary"
      title="Executive Summary"
      description="Overall strategic blueprint, audience profiling, and market position."
      icon={<FileText className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Main Header Card */}
        <GlassCard variant="gradient" hoverable={false} className="border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {data.favicon ? (
                <img
                  src={data.favicon}
                  alt={`${data.websiteName} favicon`}
                  className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 p-1.5 border border-gray-200 dark:border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%236366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>';
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 text-primary-500 font-extrabold text-xl">
                  {data.websiteName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  {data.websiteName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                  Estimated profiles based on public web audits
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{data.category}</Badge>
              <Badge variant="info">{data.industry}</Badge>
            </div>
          </div>
        </GlassCard>

        {/* Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-3">
            <div className="p-2 w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/25 flex items-center justify-center">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                Target Audience
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block truncate">
                {data.targetAudience}
              </span>
            </div>
          </div>

          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-3">
            <div className="p-2 w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-accent-400 border border-cyan-500/25 flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                Company Stage
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block truncate">
                {data.companyStage}
              </span>
            </div>
          </div>

          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-3">
            <div className="p-2 w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/25 flex items-center justify-center">
              <Target className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                Market Position
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block truncate">
                {data.marketPosition}
              </span>
            </div>
          </div>

          <div className="glass border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-3">
            <div className="p-2 w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                Traffic Level
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block truncate">
                {data.estimatedTrafficLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hoverable={false} className="flex-1 border border-white/5">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">
                  What it does
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.whatItDoes}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hoverable={false} className="flex-1 border border-white/5">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-accent-400 border border-cyan-500/20 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">
                  Who it is for
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.whoItsFor}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hoverable={false} className="flex-1 border border-white/5">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20 shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">
                  Why people use it
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.whyPeopleUseIt}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
};
