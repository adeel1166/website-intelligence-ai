import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { AnalysisProgress as AnalysisProgressType } from '@/types/analysis';

interface AnalysisProgressProps {
  progress: AnalysisProgressType;
  url: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  progress,
  url,
}) => {
  const percentComplete = Math.round((progress.step / progress.totalSteps) * 100);

  return (
    <div className="min-h-screen w-full bg-background dark:bg-background-dark flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden select-none">
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-primary-500/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-accent-500/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-glass z-10 space-y-6">
        {/* URL + Percent */}
        <div className="space-y-2 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary-500 dark:text-primary-400">
            Analyzing Target
          </span>
          <h2 className="font-bold text-gray-900 dark:text-white truncate text-sm max-w-[320px] mx-auto">
            {url}
          </h2>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
            <span>Overall Progress</span>
            <span>{percentComplete}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            />
          </div>
        </div>

        {/* Stepper items list */}
        <div className="space-y-3.5 pt-2">
          {progress.steps.map((step, idx) => {
            const isActive = step.status === 'active';
            const isComplete = step.status === 'complete';
            const isError = step.status === 'error';

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-3 text-xs font-semibold ${
                  isActive
                    ? 'text-primary-500'
                    : isComplete
                    ? 'text-emerald-500'
                    : isError
                    ? 'text-red-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                  {isComplete ? (
                    <CheckCircle2 className="w-4.5 h-4.5 stroke-[2.5]" />
                  ) : isActive ? (
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  ) : isError ? (
                    <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-gray-300 dark:text-white/10" />
                  )}
                </div>
                <span className={isComplete ? 'line-through opacity-70' : ''}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
