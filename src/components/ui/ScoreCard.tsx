import React from 'react';

interface ScoreCardProps {
  icon: React.ReactNode;
  label: string;
  score: number;
  description: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  icon,
  label,
  score,
  description,
}) => {
  const getColorClass = (val: number) => {
    if (val >= 80) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (val >= 60) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (val >= 40) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (val >= 20) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  const getScoreColorText = (val: number) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 60) return 'text-green-500';
    if (val >= 40) return 'text-yellow-500';
    if (val >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between border border-white/5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl border ${getColorClass(score).split(' ').slice(1).join(' ')}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-gray-200">{label}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <span className={`font-mono text-3xl font-extrabold ${getScoreColorText(score)}`}>
          {score}
        </span>
        <span className="text-gray-400 dark:text-gray-500 text-sm font-semibold">/100</span>
      </div>
    </div>
  );
};
