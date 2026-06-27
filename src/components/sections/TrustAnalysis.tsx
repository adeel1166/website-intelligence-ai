import React from 'react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, HelpCircle, Lightbulb } from 'lucide-react';
import { TrustAnalysisData as TrustType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { RadialGauge } from '@/components/ui/RadialGauge';

interface TrustAnalysisProps {
  data: TrustType;
  isLoading: boolean;
}

export const TrustAnalysis: React.FC<TrustAnalysisProps> = ({
  data,
  isLoading,
}) => {
  const getSignalStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />;
    }
  };

  return (
    <SectionWrapper
      id="trust-analysis"
      title="Trust & Security Analysis"
      description="Cryptographic protocols, consumer rights policies, and brand verifiability."
      icon={<Shield className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Score & Checklist */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard hoverable={false} className="border border-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                    Verified Trust Checklist
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Audit of visible consumer security vectors
                  </p>
                </div>
                <RadialGauge score={data.trustScore} label="Trust Score" size="sm" />
              </div>

              {/* Signals list */}
              <div className="space-y-4">
                {data.signals.map((sig) => (
                  <div
                    key={sig.name}
                    className="flex gap-4 items-start p-3 hover:bg-gray-50/50 dark:hover:bg-white/5 border border-transparent hover:border-gray-150 dark:hover:border-white/10 rounded-xl transition-all"
                  >
                    {getSignalStatusIcon(sig.status)}
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-250 block">
                        {sig.name}
                      </span>
                      <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed">
                        {sig.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Risks & Recommendations */}
          <div className="space-y-6">
            {/* Risk indicators */}
            {data.riskIndicators.length > 0 && (
              <GlassCard hoverable={false} className="border border-red-500/10 bg-red-500/[0.01] space-y-4">
                <div className="flex items-center gap-2 text-red-500 border-b border-red-500/10 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider">Discovered Risks</h4>
                </div>
                <ul className="space-y-3">
                  {data.riskIndicators.map((risk, idx) => (
                    <li key={idx} className="flex gap-2 text-[11px] font-semibold text-red-500 leading-relaxed">
                      <span>•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Recommendations */}
            <GlassCard hoverable={false} className="border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-primary-500 border-b border-primary-500/10 pb-2">
                <Lightbulb className="w-4.5 h-4.5" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider">Trust Roadmap</h4>
              </div>
              <ul className="space-y-3.5">
                {data.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-2 text-[11px] font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                    <span className="text-primary-500 font-bold select-none">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
