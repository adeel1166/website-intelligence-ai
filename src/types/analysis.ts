// ============================================================
// Website Intelligence AI — Core Types
// ============================================================

export interface WebsiteAnalysis {
  url: string;
  domain: string;
  analyzedAt: string;
  executiveSummary: ExecutiveSummary;
  businessModel: BusinessModelAnalysis;
  healthScore: HealthScoreAnalysis;
  designAnalysis: DesignAnalysisData;
  trustAnalysis: TrustAnalysisData;
  conversionAnalysis: ConversionAnalysisData;
  seoAnalysis: SEOAnalysisData;
  performanceAnalysis: PerformanceAnalysisData;
  competitors: CompetitorData[];
  competitiveIntelligence: CompetitiveIntelligenceData;
  growthOpportunities: GrowthOpportunitiesData;
  reverseEngineer: ReverseEngineerData;
  revenueVisualization: RevenueVisualizationData;
  aiInsights: AIInsight[];
}

// Section 1: Executive Summary
export interface ExecutiveSummary {
  websiteName: string;
  category: string;
  industry: string;
  targetAudience: string;
  description: string;
  companyStage: string;
  marketPosition: string;
  estimatedTrafficLevel: string;
  whatItDoes: string;
  whoItsFor: string;
  whyPeopleUseIt: string;
  favicon?: string;
  screenshot?: string;
}

// Section 2: Business Model
export interface BusinessModelAnalysis {
  primaryRevenue: RevenueStream;
  secondaryRevenue: RevenueStream[];
  pricingStrategy: string;
  customerType: string;
  acquisitionChannels: string[];
  howItMakesMoney: string;
  allStreams: RevenueStream[];
}

export interface RevenueStream {
  name: string;
  type: RevenueType;
  confidence: number; // 0-100
  description: string;
}

export type RevenueType =
  | 'subscription'
  | 'freemium'
  | 'ecommerce'
  | 'marketplace'
  | 'advertising'
  | 'affiliate'
  | 'lead-generation'
  | 'service'
  | 'membership'
  | 'commission'
  | 'sponsored'
  | 'donations';

// Section 3: Health Score
export interface HealthScoreAnalysis {
  overall: number;
  design: ScoreBreakdown;
  trust: ScoreBreakdown;
  conversion: ScoreBreakdown;
  seo: ScoreBreakdown;
  performance: ScoreBreakdown;
  accessibility: ScoreBreakdown;
}

export interface ScoreBreakdown {
  score: number;
  label: string;
  details: string;
}

// Section 4: Design Analysis
export interface DesignAnalysisData {
  typography: AnalysisItem;
  spacing: AnalysisItem;
  visualHierarchy: AnalysisItem;
  navigation: AnalysisItem;
  brandConsistency: AnalysisItem;
  readability: AnalysisItem;
  colorSystem: AnalysisItem;
  mobileResponsiveness: AnalysisItem;
  ctaVisibility: AnalysisItem;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface AnalysisItem {
  score: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  notes: string;
}

// Section 5: Trust Analysis
export interface TrustAnalysisData {
  trustScore: number;
  signals: TrustSignal[];
  riskIndicators: string[];
  recommendations: string[];
}

export interface TrustSignal {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'unknown';
  details: string;
  icon: string;
}

// Section 6: Conversion Analysis
export interface ConversionAnalysisData {
  headlineQuality: AnalysisItem;
  ctaButtons: AnalysisItem;
  pricingStructure: AnalysisItem;
  forms: AnalysisItem;
  socialProof: AnalysisItem;
  leadMagnets: AnalysisItem;
  userJourney: AnalysisItem;
  signupFriction: AnalysisItem;
  landingPageStructure: AnalysisItem;
  whatsWorking: string[];
  whatsHurting: string[];
  howToImprove: string[];
}

// Section 7: SEO Analysis
export interface SEOAnalysisData {
  score: number;
  metaTags: SEOItem;
  headings: SEOItem;
  keywords: SEOItem;
  images: SEOItem;
  contentStructure: SEOItem;
  internalLinks: SEOItem;
  structuredData: SEOItem;
  issues: string[];
  recommendations: string[];
}

export interface SEOItem {
  status: 'pass' | 'fail' | 'warning';
  details: string;
  value?: string;
}

// Section 8: Performance Analysis
export interface PerformanceAnalysisData {
  score: number;
  indicators: PerformanceIndicator[];
  suggestions: string[];
}

export interface PerformanceIndicator {
  name: string;
  value: string;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

// Section 9: Competitor Discovery
export interface CompetitorData {
  name: string;
  website: string;
  similarityScore: number;
  businessModel: string;
  industry: string;
  keyStrengths: string[];
  whyCompetitor: string;
  howTheyDiffer: string;
  whatTheyDoBetter: string;
}

// Section 10: Competitive Intelligence
export interface CompetitiveIntelligenceData {
  yourScore: number;
  competitorAverage: number;
  strengthComparison: ComparisonItem[];
  weaknessComparison: ComparisonItem[];
  opportunities: string[];
  advantages: string[];
  disadvantages: string[];
  improvementRoadmap: RoadmapItem[];
}

export interface ComparisonItem {
  area: string;
  yourScore: number;
  competitorScore: number;
}

export interface RoadmapItem {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
}

// Section 11: Growth Opportunities
export interface GrowthOpportunitiesData {
  quickWins: Opportunity[];
  mediumImprovements: Opportunity[];
  longTermOpportunities: Opportunity[];
}

export interface Opportunity {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
}

// Section 12: Reverse Engineer
export interface ReverseEngineerData {
  whyBusinessExists: string;
  howItStarted: string;
  howItAcquiresCustomers: string;
  whyCustomersPay: string;
  whatMakesItSuccessful: string;
  howToBuildSimilar: string;
}

// Section 13: Revenue Visualization
export interface RevenueVisualizationData {
  revenueSources: ChartDataItem[];
  customerSegments: ChartDataItem[];
  acquisitionChannels: ChartDataItem[];
}

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

// Section 14: AI Insights
export interface AIInsight {
  id: string;
  text: string;
  category: 'strength' | 'weakness' | 'opportunity' | 'risk' | 'observation';
  confidence: number;
  icon: string;
}

// Analysis State
export type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';

export interface AnalysisProgress {
  step: number;
  totalSteps: number;
  currentStep: string;
  steps: ProgressStep[];
}

export interface ProgressStep {
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}

// Analysis History
export interface AnalysisHistoryItem {
  id: string;
  url: string;
  domain: string;
  analyzedAt: string;
  websiteName: string;
  overallScore: number;
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

// Raw extracted data from webpage
export interface ExtractedWebData {
  url: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  favicon?: string;
  headings: { level: number; text: string }[];
  metaTags: Record<string, string>;
  links: { href: string; text: string; isExternal: boolean }[];
  images: { src: string; alt: string }[];
  scripts: string[];
  stylesheets: string[];
  hasSSL: boolean;
  hasPricingPage: boolean;
  hasLoginPage: boolean;
  hasSignupPage: boolean;
  hasPrivacyPolicy: boolean;
  hasTerms: boolean;
  hasContactPage: boolean;
  hasAboutPage: boolean;
  hasBlog: boolean;
  socialLinks: Record<string, string>;
  techStack: string[];
  structuredData: Record<string, unknown>[];
  textContent: string;
  wordCount: number;
  formCount: number;
  ctaCount: number;
  testimonialCount: number;
}
