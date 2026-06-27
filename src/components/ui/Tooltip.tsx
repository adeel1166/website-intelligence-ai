import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg border border-white/10 whitespace-nowrap pointer-events-none ${positionStyles[position]}`}
          >
            {content}
            {/* Tooltip Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-800 border-r border-b border-white/10 ${
                position === 'top' ? 'top-full -translate-y-1' : 'bottom-full translate-y-1 border-t border-l border-r-0 border-b-0'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
