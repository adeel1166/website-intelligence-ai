import React from 'react';
import { motion } from 'framer-motion';
import { SkeletonCard } from './SkeletonLoader';

interface SectionWrapperProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  description,
  icon,
  isLoading = false,
  children,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-xl border border-primary-500/20">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          children
        )}
      </div>
    </motion.section>
  );
};
