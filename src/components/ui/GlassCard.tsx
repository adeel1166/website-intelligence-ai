import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
}) => {
  return (
    <div
      className={`
        ${variant === 'gradient' ? 'gradient-border' : 'glass'}
        ${hoverable ? 'hover:shadow-glass hover:-translate-y-0.5 hover:border-primary-500/20' : ''}
        transition-all duration-300 rounded-2xl overflow-hidden
        ${className}
      `}
    >
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};
