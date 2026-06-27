import React from 'react';
import { motion } from 'framer-motion';

interface RadialGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  score,
  label = 'Score',
  size = 'md',
  showLabel = true,
}) => {
  // Normalize score
  const cleanScore = Math.max(0, Math.min(100, score));

  // Determine colors
  const getColorClass = (val: number) => {
    if (val >= 80) return 'stroke-emerald-500 text-emerald-500';
    if (val >= 60) return 'stroke-green-500 text-green-500';
    if (val >= 40) return 'stroke-yellow-500 text-yellow-500';
    if (val >= 20) return 'stroke-orange-500 text-orange-500';
    return 'stroke-red-500 text-red-500';
  };

  const getBgColorClass = (val: number) => {
    if (val >= 80) return 'stroke-emerald-500/10';
    if (val >= 60) return 'stroke-green-500/10';
    if (val >= 40) return 'stroke-yellow-500/10';
    if (val >= 20) return 'stroke-orange-500/10';
    return 'stroke-red-500/10';
  };

  // Size config
  const sizeConfig = {
    sm: { diameter: 80, strokeWidth: 6, fontSize: 'text-lg', labelSize: 'text-[10px]' },
    md: { diameter: 120, strokeWidth: 8, fontSize: 'text-2xl', labelSize: 'text-xs' },
    lg: { diameter: 160, strokeWidth: 10, fontSize: 'text-4xl', labelSize: 'text-sm' },
  };

  const config = sizeConfig[size];
  const radius = (config.diameter - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cleanScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative"
        style={{ width: config.diameter, height: config.diameter }}
      >
        {/* SVG Gauge */}
        <svg
          width={config.diameter}
          height={config.diameter}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            className={`${getBgColorClass(cleanScore)}`}
            strokeWidth={config.strokeWidth}
            fill="transparent"
          />
          {/* Animated Foreground circle */}
          <motion.circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            className={`${getColorClass(cleanScore)}`}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Score Number in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`font-mono font-bold ${config.fontSize} ${getColorClass(cleanScore).split(' ')[1]}`}
          >
            {cleanScore}
          </motion.span>
          {showLabel && size !== 'sm' && (
            <span className="text-gray-400 dark:text-gray-500 font-medium text-[10px] uppercase tracking-wider">
              {label}
            </span>
          )}
        </div>
      </div>
      {showLabel && size === 'sm' && (
        <span className="mt-2 text-gray-500 dark:text-gray-400 text-xs font-semibold">
          {label}
        </span>
      )}
    </div>
  );
};
