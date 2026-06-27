import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { AnalysisHistoryItem } from '@/types/analysis';

interface AppShellProps {
  children: React.ReactNode;
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
  history: AnalysisHistoryItem[];
  onHistoryClick: (item: AnalysisHistoryItem) => void;
  analysisComplete: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onAnalyze,
  isAnalyzing,
  history,
  onHistoryClick,
  analysisComplete,
}) => {
  const [activeSection, setActiveSection] = useState('executive-summary');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [children]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 flex flex-col">
      <Header
        onAnalyze={onAnalyze}
        isAnalyzing={isAnalyzing}
        analysisComplete={analysisComplete}
      />
      <div className="flex-1 flex relative">
        <Sidebar
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          history={history}
          onHistoryClick={onHistoryClick}
        />
        <main className="flex-1 min-w-0 md:ml-[260px] p-6 md:p-12 max-w-7xl mx-auto space-y-12">
          {children}
        </main>
      </div>
      <MobileNav activeSection={activeSection} onSectionClick={scrollToSection} />
    </div>
  );
};
