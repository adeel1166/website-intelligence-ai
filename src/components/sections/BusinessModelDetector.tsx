import React from 'react';
import {
  DollarSign,
  Repeat,
  Sparkles,
  ShoppingBag,
  Layers,
  Megaphone,
  Link as LinkIcon,
  UserPlus,
  Briefcase,
  UserCheck,
  Percent,
  Gift,
  Heart,
  HelpCircle,
  CreditCard,
  User,
  Radio,
} from 'lucide-react';
import { BusinessModelAnalysis as BusinessModelType, RevenueType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedBar } from '@/components/ui/AnimatedBar';
import { Badge } from '@/components/ui/Badge';

interface BusinessModelDetectorProps {
  data: BusinessModelType;
  isLoading: boolean;
}

const REVENUE_ICONS: Record<RevenueType, React.ComponentType<{ className?: string }>> = {
  subscription: Repeat,
  freemium: Sparkles,
  ecommerce: ShoppingBag,
  marketplace: Layers,
  advertising: Megaphone,
  affiliate: LinkIcon,
  'lead-generation': UserPlus,
  service: Briefcase,
  membership: UserCheck,
  commission: Percent,
  sponsored: Gift,
  donations: Heart,
};

export const BusinessModelDetector: React.FC<BusinessModelDetectorProps> = ({
  data,
  isLoading,
}) => {
  const getIcon = (type: RevenueType) => {
    const IconComponent = REVENUE_ICONS[type] || HelpCircle;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <SectionWrapper
      id="business-model"
      title="AI Business Model Detector"
      description="Monetization vectors, marketing loops, and pricing structures."
      icon={<DollarSign className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Center - Core streams */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Stream Card */}
            <GlassCard variant="gradient" hoverable={false} className="border border-white/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20">
                Primary Monetization
              </div>
              <div className="flex gap-4 items-start pt-2">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 rounded-xl shrink-0">
                  {getIcon(data.primaryRevenue.type)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg text-gray-900 dark:text-white leading-none">
                      {data.primaryRevenue.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-gray-400">
                      ({data.primaryRevenue.confidence}% confidence)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                    {data.primaryRevenue.description}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* All Streams Breakdown */}
            <GlassCard hoverable={false} className="border border-white/5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6">
                Revenue Streams Breakdown
              </h4>
              <div className="space-y-5">
                {data.allStreams.map((stream, idx) => (
                  <AnimatedBar
                    key={stream.name}
                    label={stream.name}
                    value={stream.confidence}
                    delay={idx * 0.1}
                  />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right - Profile and Channels */}
          <div className="space-y-6">
            {/* Structure metrics */}
            <GlassCard hoverable={false} className="border border-white/5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                    Pricing Strategy
                  </span>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block">
                    {data.pricingStrategy}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 dark:text-accent-400 border border-cyan-500/20 shrink-0">
                  <User className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                    Customer Profile
                  </span>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1 block">
                    {data.customerType}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-gray-100 dark:border-white/5 pt-4">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20 shrink-0">
                  <Radio className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider block">
                    Acquisition Channels
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {data.acquisitionChannels.map((chan) => (
                      <Badge key={chan} variant="default" size="sm">
                        {chan}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Summary Narrative */}
            <GlassCard hoverable={false} className="border border-white/5 bg-primary-500/[0.02]">
              <h4 className="font-bold text-xs uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-2">
                Monetization Overview
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.howItMakesMoney}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
