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
  | 'services'
  | 'services/illumination'
  | 'services/blueprint'
  | 'services/story'
  | 'about'
  | 'book'
  | 'insights'
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
  service?: 'illumination' | 'blueprint' | 'story';
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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
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
