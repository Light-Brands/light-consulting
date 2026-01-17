/**
 * Light Brand Consulting - Type Definitions
 */

import React from 'react';

// ============================================================================
// Component Types
// ============================================================================

export type ComponentVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// ============================================================================
// Navigation Types
// ============================================================================

export type PageKey =
  | 'home'
  | 'assessment-funnel'
  | 'funnel'
  | 'funnel1'
  | 'funnel2'
  | 'funnel3'
  | 'funnel4'
  | 'funnel5'
  | 'funnel6'
  | 'funnel7'
  | 'funnel8'
  | 'funnel9'
  | 'funnel10'
  | 'funnel11'
  | 'funnel12'
  | 'funnel13'
  | 'funnel14'
  | 'funnel15'
  | 'funnel16'
  | 'funnel17'
  | 'funnel18'
  | 'funnel19'
  | 'funnel20'
  | 'funnel21'
  | 'funnel22'
  | 'funnel23'
  | 'funnel24'
  | 'funnel25'
  | 'funnel26'
  | 'funnel27'
  | 'funnel28'
  | 'funnel29'
  | 'funnel30'
  | 'funnel31'
  | 'funnel32'
  | 'funnel33'
  | 'funnel34'
  | 'funnel35'
  | 'funnel36'
  | 'funnel-gallery'
  | 'services'
  | 'services/diagnostic'
  | 'services/command-center'
  | 'services/authority-engine'
  | 'services/ascension'
  | 'services/illumination'
  | 'services/blueprint'
  | 'services/story'
  | 'services/strategy'
  | 'services/heroes'
  | 'about'
  | 'portfolio'
  | 'book'
  | 'insights'
  | 'insights/labor-arbitrage'
  | 'contact'
  | 'assessment';

export interface NavItem {
  key: PageKey;
  label: string;
  href: string;
}

// ============================================================================
// Service Types
// ============================================================================

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  investment: string;
  duration: string;
  deliverables: string[];
  process: ProcessStep[];
  idealFor: string[];
  notFor: string[];
  faq: FAQItem[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ============================================================================
// Lead & Contact Types
// ============================================================================

export interface Lead {
  id?: string;
  email: string;
  name?: string;
  company?: string;
  source: 'newsletter' | 'booking' | 'contact' | 'content';
  created_at?: Date;
  tags?: string[];
  status?: 'new' | 'contacted' | 'qualified' | 'converted';
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// ============================================================================
// Booking Types
// ============================================================================

export interface BookingFormData {
  service?: 'diagnostic' | 'command-center' | 'authority-engine' | 'ascension';
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  intake?: Record<string, string>;
  slot?: Date;
}

// AI-powered booking form data
export interface AIReport {
  context: string;
  challenges: string[];
  opportunities: string[];
  valueProposition: string;
  nextSteps: string[];
}

export interface WebsiteAnalysis {
  techStack: {
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
  };
  websiteStory: string;
  readinessScore: number;
  readinessBrief: string;
  capacityGapBrief: string;
  // Enhanced business intelligence (optional for backwards compatibility)
  businessIntelligence?: import('./types/business-intelligence').BusinessIntelligence;
  fullReadinessReport?: string;
}

export interface AIBookingFormData {
  document?: File | null;
  websiteUrl?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  aiReport?: AIReport;
  websiteAnalysis?: WebsiteAnalysis;
  isAnalyzing?: boolean;
  isComplete?: boolean;
  leadId?: string;
}

export interface IntakeQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  required?: boolean;
}

// ============================================================================
// Content Types
// ============================================================================

export interface ImagePlaceholder {
  src?: string;
  alt: string;
  prompt: string;
  dimensions: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyUrl?: string;
  avatar?: string;
  avatarPrompt?: string;
}

export interface InsightPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author_id: string;
  featured_image?: string;
  published_at?: Date;
  status: 'draft' | 'published';
}

// ============================================================================
// Icon Types
// ============================================================================

export interface IconProps {
  className?: string;
  size?: number;
}

// ============================================================================
// AI Go/No-Go Assessment Types
// ============================================================================

// Full 10-stage assessment funnel based on AI Go/No-Go Assessment Strategy
export type AssessmentFunnelStage =
  | 'attract'      // 1. Entry landing - filter for founders with structural pain
  | 'qualify'      // 2. Self-qualification - decision-maker status, accepts negative verdict
  | 'book'         // 3. Calendar booking - scheduled WITHOUT pricing disclosed
  | 'educate'      // 4. VSL video - mandatory watch reveals scope and cost
  | 'confirm'      // 5. Call confirmation - only if video completed
  | 'commit'       // 6. Payment - collected before intake begins
  | 'intake'       // 7. Questionnaire + Loom video - async structured intake
  | 'deliver'      // 8. Verdict call - 30-minute call with 3 reasoning points
  | 'document'     // 9. Report delivery - single-page with scores and implications
  | 'exit';        // 10. Clean closure - no follow-ups unless client-initiated

// Legacy 4-stage type for backwards compatibility
export type AssessmentStage =
  | 'qualify'      // Landing/self-qualification (no pricing)
  | 'educate'      // VSL video viewing (pricing revealed)
  | 'book'         // Calendar booking (after VSL)
  | 'status';      // Confirmation/next steps

export type AssessmentVerdict = 'GO' | 'CONDITIONAL_GO' | 'NO_GO' | null;

export interface AssessmentFormData {
  // Contact info
  name?: string;
  email?: string;
  company?: string;
  phone?: string;

  // Lead tracking
  leadId?: string;
  source?: string; // e.g., 'assessment', 'funnel-1', 'direct'

  // Stage 2: Qualification
  isDecisionMaker?: boolean;
  acceptsFixedPricing?: boolean;
  openToNegativeVerdict?: boolean;

  // Stage 3: Booking (before VSL)
  bookingId?: string;
  bookedSlot?: Date;
  bookingConfirmed?: boolean;

  // Stage 4: VSL / Educate tracking
  vslStartedAt?: Date;
  vslCompletedAt?: Date;
  vslWatchPercentage?: number;
  priceAcknowledged?: boolean; // User saw and acknowledged the $5,000 price

  // Stage 5: Confirm (after VSL)
  callConfirmed?: boolean;
  callConfirmedAt?: Date;

  // Stage 6: Commit (Payment)
  assessmentId?: string;
  paymentSessionId?: string;
  paymentCompleted?: boolean;
  paymentCompletedAt?: Date;

  // Stage 7: Intake
  intakeResponses?: Record<string, string>;
  loomVideoUrl?: string;
  intakeSubmittedAt?: Date;

  // Stage 8: Deliver (Verdict)
  verdict?: AssessmentVerdict;
  verdictDeliveredAt?: Date;
  verdictReasons?: string[]; // Exactly 3 reasoning points

  // Stage 9: Document (Report)
  reportUrl?: string;
  reportDeliveredAt?: Date;
  verdictScores?: {
    decisionConcentration: number; // 1-10
    founderDependency: number; // 1-10
    decisionCodification: number; // 1-10
    leverageReadiness: number; // 1-10
  };

  // Stage 10: Exit
  exitCompletedAt?: Date;
  followUpRequested?: boolean;
}

export interface AssessmentIntakeQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface AssessmentSubmission {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;

  // Funnel tracking
  stage: AssessmentStage;
  vsl_completed: boolean;
  vsl_watch_percentage?: number;
  booking_id?: string;
  booked_slot?: string;
  payment_session_id?: string;
  payment_completed: boolean;
  payment_completed_at?: string;

  // Intake
  intake_responses?: Record<string, string>;
  loom_video_url?: string;
  intake_submitted_at?: string;

  // Verdict
  verdict?: AssessmentVerdict;
  verdict_delivered_at?: string;
  verdict_report_url?: string;

  created_at: string;
  updated_at: string;
}
