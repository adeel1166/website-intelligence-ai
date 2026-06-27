import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Cpu, AlertCircle } from 'lucide-react';

interface HeroSectionProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
  error: string | null;
}

const EXAMPLES = ['notion.so', 'canva.com', 'shopify.com', 'airbnb.com'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAnalyze,
  isAnalyzing,
  error,
}) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isAnalyzing) {
      onAnalyze(url);
    }
  };

  const handleExampleClick = (example: string) => {
    if (!isAnalyzing) {
      setUrl(example);
      onAnalyze(example);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background dark:bg-background-dark overflow-hidden flex flex-col items-center justify-center p-6 md:p-12">
      {/* Premium Floating Blur Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-primary-500/20 rounded-full filter blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-accent-500/20 rounded-full filter blur-[120px] animate-pulse-glow duration-3000 pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[250px] h-[250px] bg-purple-500/10 rounded-full filter blur-[90px] animate-pulse-glow duration-4000 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl text-center z-10 flex flex-col items-center space-y-8"
      >
        {/* Logo Icon */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow border border-primary-400/20 mb-2"
        >
          <Cpu className="w-8 h-8 animate-pulse-glow" />
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight text-balance">
            Website Intelligence <span className="gradient-text">AI</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-balance">
            Paste Any Website. Discover How It Works. Learn How It Makes Money.
          </p>
        </motion.div>

        {/* Search input Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-gray-200 dark:border-white/10 shadow-glass flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full flex items-center">
            <Globe className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter any website URL (e.g., notion.so)"
              disabled={isAnalyzing}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent border-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none font-medium text-sm md:text-base disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 whitespace-nowrap px-8 py-4 rounded-xl disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>Analyze Website</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 hover:translate-x-1" />
              </>
            )}
          </button>
        </motion.form>

        {/* Error State */}
        {error && (
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xl bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 text-left"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold">
              <span className="font-bold">Error:</span> {error}
            </div>
          </motion.div>
        )}

        {/* Examples / Chips */}
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
            Or try one of these examples:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExampleClick(ex)}
                disabled={isAnalyzing}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all hover:scale-105"
              >
                {ex}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust features list */}
        <motion.div
          variants={itemVariants}
          className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-6 mt-6"
        >
          <span>No signup required</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/10" />
          <span>Free to use</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/10" />
          <span>AI-powered analysis</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
