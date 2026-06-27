import React from 'react';

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`skeleton h-32 w-full rounded-2xl ${className}`} />;
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-3 w-full ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-lg"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
};

export const SkeletonChart: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`glass border border-white/5 rounded-2xl p-6 flex flex-col justify-between ${className}`}>
      <div className="skeleton h-6 w-1/3 mb-6" />
      <div className="flex items-end gap-3 h-48">
        <div className="skeleton h-[40%] w-full" />
        <div className="skeleton h-[70%] w-full" />
        <div className="skeleton h-[55%] w-full" />
        <div className="skeleton h-[90%] w-full" />
        <div className="skeleton h-[35%] w-full" />
      </div>
    </div>
  );
};

export const SkeletonGauge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="skeleton rounded-full w-24 h-24" />
      <div className="skeleton h-4 w-16 mt-4" />
    </div>
  );
};

export const SkeletonList: React.FC<{ items?: number; className?: string }> = ({
  items = 4,
  className = '',
}) => {
  return (
    <div className={`space-y-4 w-full ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="skeleton w-12 h-12 rounded-xl shrink-0" />
          <div className="space-y-2 w-full">
            <div className="skeleton h-4 w-1/4" />
            <div className="skeleton h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
