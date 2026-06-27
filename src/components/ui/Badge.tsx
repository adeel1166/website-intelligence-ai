import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyle = 'inline-flex items-center font-semibold rounded-full tracking-wide transition-colors duration-150';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300 border border-gray-200 dark:border-white/10',
    success: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20',
    primary: 'bg-primary-500/10 text-primary-500 border border-primary-500/20',
  };

  return (
    <span className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
