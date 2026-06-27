import React from 'react';
import { Users, ExternalLink, Star, Compass, HelpCircle } from 'lucide-react';
import { CompetitorData as CompetitorType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface CompetitorDiscoveryProps {
  data: CompetitorType[];
  isLoading: boolean;
}

export const CompetitorDiscovery: React.FC<CompetitorDiscoveryProps> = ({
  data,
  isLoading,
}) => {
  const getSimilarityVariant = (score: number) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'primary';
    if (score >= 50) return 'warning';
    return 'default';
  };

  if (!data || data.length === 0) {
    return (
      <SectionWrapper
        id="competitor-discovery"
        title="Competitor Discovery"
        description="Discovering market overlap, similarity indices, and platform variances."
        icon={<Users className="w-5 h-5" />}
        isLoading={isLoading}
      >
        <GlassCard hoverable={false} className="border border-white/5 text-center p-12">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-bold text-gray-700 dark:text-gray-300">No Competitors Detected</h4>
          <p className="text-xs text-gray-500 dark:text-gray-450 mt-1 max-w-sm mx-auto">
            Our heuristics couldn't find matching market overlaps for this specific category.
          </p>
        </GlassCard>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="competitor-discovery"
      title="Competitor Discovery"
      description="Discovering market overlap, similarity indices, and platform variances."
      icon={<Users className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Table of Competitors for quick scan */}
        <GlassCard hoverable={false} className="border border-white/5 overflow-x-auto p-0">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-150 dark:border-white/5 bg-gray-50/50 dark:bg-black/10">
                <th className="p-4 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-550 tracking-wider">Company</th>
                <th className="p-4 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-550 tracking-wider">Market Overlap</th>
                <th className="p-4 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-550 tracking-wider">Business Model</th>
                <th className="p-4 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-550 tracking-wider">Industry</th>
                <th className="p-4 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-550 tracking-wider">Strengths</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs font-semibold">
              {data.map((c) => (
                <tr key={c.name} className="hover:bg-gray-50/[0.3] dark:hover:bg-white/[0.01]">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 dark:text-gray-200">{c.name}</span>
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-primary-500 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>{c.website.replace('https://', '')}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={getSimilarityVariant(c.similarityScore)}>
                      {c.similarityScore}% Similar
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{c.businessModel}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{c.industry}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-455">
                    {c.keyStrengths.slice(0, 2).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>

        {/* Detailed Competitor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((c) => (
            <GlassCard key={c.name} className="border border-white/5 flex flex-col justify-between h-full space-y-5">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-black text-base text-gray-900 dark:text-white truncate">
                    {c.name}
                  </h4>
                  <Badge variant={getSimilarityVariant(c.similarityScore)}>
                    {c.similarityScore}%
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="default" size="sm">{c.businessModel}</Badge>
                </div>
              </div>

              {/* Strengths list */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 block">
                  Key Strengths
                </span>
                <div className="space-y-1.5">
                  {c.keyStrengths.map((str) => (
                    <div key={str} className="flex gap-2 text-[10px] font-semibold text-gray-650 dark:text-gray-300 leading-relaxed">
                      <Star className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Narratives */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3.5">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 block">
                    Market Overlap
                  </span>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">
                    {c.whyCompetitor}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500 block">
                    Product Focus
                  </span>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">
                    {c.howTheyDiffer}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-primary-500 dark:text-primary-400 block">
                    Competitive Advantage
                  </span>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5 italic">
                    "{c.whatTheyDoBetter}"
                  </p>
                </div>
              </div>

              {/* Website Link */}
              <div className="pt-2">
                <a
                  href={c.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-gray-700 dark:text-gray-300 transition-all hover:scale-102"
                >
                  <span>Visit {c.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
