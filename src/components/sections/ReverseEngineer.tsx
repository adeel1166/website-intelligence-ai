import React from 'react';
import { Wrench, Lightbulb, Rocket, Users, CreditCard, Trophy, Code } from 'lucide-react';
import { ReverseEngineerData as ReverseType } from '@/types/analysis';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';

interface ReverseEngineerProps {
  data: ReverseType;
  isLoading: boolean;
}

export const ReverseEngineer: React.FC<ReverseEngineerProps> = ({
  data,
  isLoading,
}) => {
  const steps = [
    { title: 'Why this business exists', text: data.whyBusinessExists, icon: Lightbulb, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
    { title: 'How it likely started', text: data.howItStarted, icon: Rocket, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { title: 'How it acquires customers', text: data.howItAcquiresCustomers, icon: Users, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
    { title: 'Why customers pay', text: data.whyCustomersPay, icon: CreditCard, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'What makes it successful', text: data.whatMakesItSuccessful, icon: Trophy, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    { title: 'How to build something similar', text: data.howToBuildSimilar, icon: Code, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
  ];

  return (
    <SectionWrapper
      id="reverse-engineer"
      title="Reverse Engineer Report"
      description="Deconstructing product origins, acquisition systems, and engineering blueprint workflows."
      icon={<Wrench className="w-5 h-5" />}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Timeline Layout */}
        <div className="relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5 space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4 relative z-10">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <GlassCard hoverable={false} className="flex-1 border border-white/5 !p-5">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-800 dark:text-gray-250 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.text}
                  </p>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 italic mt-6">
          * This reverse-engineering deconstruction is AI-estimated based on public page signatures and heuristics.
        </p>
      </div>
    </SectionWrapper>
  );
};
