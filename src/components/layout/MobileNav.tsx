import React from 'react';
import { FileText, DollarSign, Gauge, Users, Download } from 'lucide-react';

interface MobileNavProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const SHORTCUTS = [
  { id: 'executive-summary', label: 'Summary', icon: FileText },
  { id: 'business-model', label: 'Business', icon: DollarSign },
  { id: 'health-score', label: 'Health', icon: Gauge },
  { id: 'competitor-discovery', label: 'Competitors', icon: Users },
  { id: 'export', label: 'Export', icon: Download },
];

export const MobileNav: React.FC<MobileNavProps> = ({
  activeSection,
  onSectionClick,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 glass border-t border-gray-150 dark:border-white/5 flex items-center justify-around px-4 md:hidden z-40">
      {SHORTCUTS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSectionClick(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-primary-500 bg-primary-500/10'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-bold mt-1 tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
