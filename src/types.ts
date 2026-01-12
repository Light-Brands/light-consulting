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
  | 'funnel'
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
  | 'contact';

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
