import React, { useState } from 'react';
import { Sun, Moon, Search, Cpu } from 'lucide-react';
import { useTheme } from '@/utils/theme';

interface HeaderProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
  analysisComplete: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onAnalyze,
  isAnalyzing,
  analysisComplete,
}) => {
  const { theme, setTheme, isDark } = useTheme();
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim() && !isAnalyzing) {
      onAnalyze(urlInput);
      setUrlInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-gray-150 dark:border-white/5 h-16 flex items-center px-6 justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 select-none">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow border border-primary-400/20">
          <Cpu className="w-5 h-5 animate-pulse-glow" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-white leading-none">
            Website Intelligence
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest gradient-text font-black mt-0.5">
            AI platform
          </span>
        </div>
      </div>

      {/* URL input for quick re-run (only on desktop when analysis is done) */}
      {analysisComplete && (
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center relative w-full max-w-md mx-6"
        >
          <Search className="absolute left-3 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Analyze another URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={isAnalyzing}
            className="w-full pl-10 pr-24 py-1.5 rounded-lg text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 font-mono text-[9px] font-medium text-gray-400 bg-gray-100 dark:bg-white/10 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded">
              Ctrl+K
            </kbd>
            <button
              type="submit"
              disabled={isAnalyzing || !urlInput.trim()}
              className="text-[10px] font-bold px-2 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors disabled:opacity-50"
            >
              Run
            </button>
          </div>
        </form>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
