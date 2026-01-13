/**
 * Business Intelligence Type Definitions
 * Light Brand Consulting
 *
 * Types for enhanced website analysis and AI-powered business intelligence
 */

// ============================================================================
// Business Intelligence Types
// ============================================================================

export interface TargetAudience {
  primary: string;
  demographics: string;
  psychographics: string;
  personas?: string[];
}

export interface CompanySize {
  employees: string;
  revenue_range: string;
  growth_stage: 'Startup' | 'Growth' | 'Scale' | 'Enterprise' | 'Unknown';
}

export interface SEOSignals {
  has_meta_tags: boolean;
  has_structured_data: boolean;
  has_sitemap: boolean;
  meta_description_quality?: string;
  title_tag_quality?: string;
}

export interface DigitalPresence {
  content_quality: 'Low' | 'Moderate' | 'High' | 'Excellent';
  site_structure: 'Poor' | 'Basic' | 'Well-organized' | 'Excellent';
  mobile_responsive: boolean;
  conversion_elements: string[];
  marketing_stack: string[];
  social_presence: string[];
  seo_signals: SEOSignals;
  page_count_estimate?: number;
  content_freshness?: string;
}

export interface TechnicalAssessment {
  performance: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  security: 'Weak' | 'Moderate' | 'Strong' | 'Excellent';
  accessibility: 'Poor' | 'Fair' | 'Moderate' | 'Good';
  integrations: string[];
  backend_architecture: string;
  cdn_usage: boolean;
  monitoring_tools: string[];
  https_enabled: boolean;
  modern_framework: boolean;
}

export interface AIReadiness {
  overall_score: number;
  current_ai_usage: string[];
  data_infrastructure: 'None' | 'Basic' | 'Moderate' | 'Advanced';
  automation_level: 'None' | 'Low' | 'Moderate' | 'High';
  integration_readiness: 'Low' | 'Moderate' | 'High';
  content_generation_needs: 'Low' | 'Moderate' | 'High' | 'Critical';
  customer_intelligence_gaps: string[];
}

export interface OperationsInsights {
  pain_points: string[];
  growth_indicators: string[];
  efficiency_opportunities: string[];
  customer_journey_gaps: string[];
  support_infrastructure: string;
}

export interface AnalysisMetadata {
  analyzed_at: string;
  analysis_version: string;
  confidence_score: number;
  pages_analyzed: number;
  analysis_duration_ms?: number;
}

export interface BusinessIntelligence {
  // Core business information
  business_model: string;
  industry: string;
  target_audience: TargetAudience;
  value_proposition: string[];
  revenue_model: string;
  company_size: CompanySize;
  geographic_presence: string[];
  competitive_positioning: string;

  // Digital presence analysis
  digital_presence: DigitalPresence;

  // Technical assessment
  technical_assessment: TechnicalAssessment;

  // AI readiness (enhanced)
  ai_readiness: AIReadiness;

  // Operations insights
  operations_insights: OperationsInsights;

  // Metadata
  analysis_metadata: AnalysisMetadata;
}

// ============================================================================
// Enhanced Website Analysis Types
// ============================================================================

export interface EnhancedTechStack {
  platform?: string;
  cms?: string;
  frameworks?: string[];
  hosting?: string;
  analytics?: string[];
  marketing_tools?: string[];
  ecommerce?: string[];
  security?: string[];
  performance?: string[];
  other?: string[];
}

export interface EnhancedWebsiteAnalysis {
  // Basic analysis (existing)
  techStack: EnhancedTechStack;
  websiteStory: string;
  readinessScore: number;
  readinessBrief: string;
  capacityGapBrief: string;

  // Enhanced business intelligence
  businessIntelligence: BusinessIntelligence;

  // Full readiness report (markdown)
  fullReadinessReport: string;
}

// ============================================================================
// Analysis Phase Types (for UI)
// ============================================================================

export type AnalysisPhase =
  | 'scraping'
  | 'tech_detection'
  | 'business_analysis'
  | 'digital_presence'
  | 'technical_audit'
  | 'ai_readiness'
  | 'operations_analysis'
  | 'generating_report';

export interface AnalysisPhaseInfo {
  id: AnalysisPhase;
  label: string;
  description: string;
  progress: { start: number; end: number };
}

export const ANALYSIS_PHASES: AnalysisPhaseInfo[] = [
  {
    id: 'scraping',
    label: 'Scanning Website',
    description: 'Extracting content and structure',
    progress: { start: 0, end: 12 }
  },
  {
    id: 'tech_detection',
    label: 'Detecting Tech Stack',
    description: 'Identifying platforms and frameworks',
    progress: { start: 12, end: 25 }
  },
  {
    id: 'business_analysis',
    label: 'Analyzing Business Model',
    description: 'Understanding industry and audience',
    progress: { start: 25, end: 40 }
  },
  {
    id: 'digital_presence',
    label: 'Evaluating Digital Presence',
    description: 'Assessing content and marketing',
    progress: { start: 40, end: 55 }
  },
  {
    id: 'technical_audit',
    label: 'Technical Assessment',
    description: 'Reviewing performance and security',
    progress: { start: 55, end: 70 }
  },
  {
    id: 'ai_readiness',
    label: 'AI Readiness Analysis',
    description: 'Evaluating automation potential',
    progress: { start: 70, end: 85 }
  },
  {
    id: 'operations_analysis',
    label: 'Operations Insights',
    description: 'Identifying opportunities',
    progress: { start: 85, end: 95 }
  },
  {
    id: 'generating_report',
    label: 'Generating Report',
    description: 'Compiling comprehensive analysis',
    progress: { start: 95, end: 100 }
  },
];

// ============================================================================
// API Response Types
// ============================================================================

export interface AnalyzeWebsiteResponse {
  success: boolean;
  analysis?: EnhancedWebsiteAnalysis;
  leadId?: string;
  error?: string;
}

// ============================================================================
// Proposal Generation Types
// ============================================================================

export interface ProposalGenerationInput {
  leadId: string;
  businessIntelligence: BusinessIntelligence;
  selectedServices: string[];
  customRequirements?: string;
  companyContext?: string;
  readinessScore: number;
}

export interface GeneratedProposalContent {
  executive_summary: string;
  opportunity_analysis: string;
  recommended_solutions: {
    service: string;
    description: string;
    benefits: string[];
    deliverables: string[];
  }[];
  implementation_approach: {
    phase: number;
    name: string;
    description: string;
    timeline: string;
    deliverables: string[];
    objectives: string[];
  }[];
  expected_outcomes: {
    category: string;
    outcome: string;
    metric?: string;
  }[];
  timeline_summary: string;
  investment: {
    total: number;
    breakdown: { phase: string; amount: number }[];
    payment_schedule: string;
  };
}

export interface ProposalGenerationResponse {
  success: boolean;
  proposal?: GeneratedProposalContent;
  error?: string;
}

// ============================================================================
// Service Recommendations
// ============================================================================

export type ServiceType = 'diagnostic' | 'command-center' | 'authority-engine' | 'ascension';

export interface ServiceRecommendation {
  service: ServiceType;
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  expectedImpact: string;
  prerequisites?: string[];
}

export interface AIServiceRecommendations {
  primary: ServiceRecommendation;
  secondary: ServiceRecommendation[];
  rationale: string;
  readinessAlignment: string;
}
