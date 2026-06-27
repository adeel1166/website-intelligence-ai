import React from 'react';
import {
  FileText,
  DollarSign,
  Gauge,
  Palette,
  Shield,
  Target,
  Search,
  Zap,
  Users,
  Swords,
  TrendingUp,
  Wrench,
  PieChart,
  Brain,
  Download,
  History,
} from 'lucide-react';
import { AnalysisHistoryItem } from '@/types/analysis';

interface SidebarProps {
  activeSection: string;
  onSectionClick: (id: string) => void;
  history: AnalysisHistoryItem[];
  onHistoryClick: (item: AnalysisHistoryItem) => void;
}

const SECTIONS = [
  { id: 'executive-summary', label: 'Executive Summary', icon: FileText },
  { id: 'business-model', label: 'Business Model', icon: DollarSign },
  { id: 'health-score', label: 'Health Score', icon: Gauge },
  { id: 'design-analysis', label: 'Design Analysis', icon: Palette },
  { id: 'trust-analysis', label: 'Trust Analysis', icon: Shield },
  { id: 'conversion-analysis', label: 'Conversion Analysis', icon: Target },
  { id: 'seo-analysis', label: 'SEO Analysis', icon: Search },
  { id: 'performance-analysis', label: 'Performance', icon: Zap },
  { id: 'competitor-discovery', label: 'Competitors', icon: Users },
  { id: 'competitive-intelligence', label: 'Competitive Intel', icon: Swords },
  { id: 'growth-opportunities', label: 'Growth Opportunities', icon: TrendingUp },
  { id: 'reverse-engineer', label: 'Reverse Engineer', icon: Wrench },
  { id: 'revenue-visualization', label: 'Revenue Visualizer', icon: PieChart },
  { id: 'ai-insights', label: 'AI Insights Panel', icon: Brain },
  { id: 'export', label: 'Export & Share', icon: Download },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionClick,
  history,
  onHistoryClick,
}) => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[260px] glass border-r border-gray-150 dark:border-white/5 flex flex-col justify-between hidden md:flex z-30 select-none">
      {/* Scrollable Section Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 no-scrollbar">
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 px-3">
          Report Directory
        </span>
        <nav className="mt-2 space-y-1">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSectionClick(sec.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                  ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 border border-transparent'
                  }
                `}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* History panel at the bottom */}
      {history.length > 0 && (
        <div className="border-t border-gray-150 dark:border-white/5 p-4 max-h-[220px] overflow-y-auto no-scrollbar space-y-2 bg-gray-50/50 dark:bg-black/10">
          <div className="flex items-center gap-2 px-2 text-gray-400 dark:text-gray-500">
            <History className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              Recent Audits
            </span>
          </div>
          <div className="space-y-1">
            {history.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => onHistoryClick(item)}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/5 text-[11px] font-medium text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-between"
              >
                <span className="truncate pr-2">{item.websiteName || item.domain}</span>
                <span className="font-mono text-[9px] px-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded font-bold">
                  {item.overallScore}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
