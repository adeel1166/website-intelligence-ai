import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  label,
  value,
  color,
  delay = 0,
}) => {
  const cleanValue = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-mono font-bold text-primary-500 dark:text-primary-400">{cleanValue}%</span>
      </div>
      <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${cleanValue}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay }}
          className={`h-full rounded-full ${color || 'bg-gradient-to-r from-primary-500 to-accent-500'}`}
        />
      </div>
    </div>
  );
};
