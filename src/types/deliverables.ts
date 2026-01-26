/**
 * Deliverable Links Type Definitions
 * Light Brand Consulting
 */

// ============================================================================
// Enums / Union Types
// ============================================================================

export type DeliverableLinkType =
  | 'document'
  | 'design'
  | 'staging'
  | 'production'
  | 'repository'
  | 'video'
  | 'spreadsheet'
  | 'presentation'
  | 'prototype'
  | 'other';

export type DeliverableStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';

// ============================================================================
// Deliverable Links
// ============================================================================

export interface DeliverableLink {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  milestone_id: string | null;
  title: string;
  description: string | null;
  url: string;
  link_type: DeliverableLinkType;
  is_client_visible: boolean;
  requires_password: boolean;
  password_hint: string | null;
  icon: string | null;
  sort_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliverableLinkInsert {
  proposal_id: string;
  phase_id?: string | null;
  milestone_id?: string | null;
  title: string;
  description?: string | null;
  url: string;
  link_type?: DeliverableLinkType;
  is_client_visible?: boolean;
  requires_password?: boolean;
  password_hint?: string | null;
  icon?: string | null;
  sort_order?: number;
  created_by?: string | null;
}

export interface DeliverableLinkUpdate {
  phase_id?: string | null;
  milestone_id?: string | null;
  title?: string;
  description?: string | null;
  url?: string;
  link_type?: DeliverableLinkType;
  is_client_visible?: boolean;
  requires_password?: boolean;
  password_hint?: string | null;
  icon?: string | null;
  sort_order?: number;
}

// ============================================================================
// Deliverables (Trackable items)
// ============================================================================

export interface Deliverable {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  name: string;
  description: string | null;
  status: DeliverableStatus;
  due_date: string | null;
  completed_at: string | null;
  assigned_to: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DeliverableInsert {
  proposal_id: string;
  phase_id?: string | null;
  name: string;
  description?: string | null;
  status?: DeliverableStatus;
  due_date?: string | null;
  assigned_to?: string | null;
  sort_order?: number;
}

export interface DeliverableUpdate {
  phase_id?: string | null;
  name?: string;
  description?: string | null;
  status?: DeliverableStatus;
  due_date?: string | null;
  completed_at?: string | null;
  assigned_to?: string | null;
  sort_order?: number;
}

// ============================================================================
// With Related Data
// ============================================================================

export interface DeliverableLinkWithContext extends DeliverableLink {
  phase_name?: string;
  milestone_name?: string;
  creator_name?: string;
}

export interface DeliverableWithAssignee extends Deliverable {
  assigned_to_name?: string;
  phase_name?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface DeliverableLinksApiResponse {
  data: DeliverableLink[] | null;
  error: string | null;
}

export interface DeliverableLinkApiResponse {
  data: DeliverableLink | null;
  error: string | null;
}

export interface DeliverablesApiResponse {
  data: Deliverable[] | null;
  error: string | null;
}

// ============================================================================
// Link Type Configuration (for UI)
// ============================================================================

export interface LinkTypeConfig {
  type: DeliverableLinkType;
  label: string;
  icon: string;
  color: string;
}

export const LINK_TYPE_CONFIGS: LinkTypeConfig[] = [
  { type: 'document', label: 'Document', icon: 'file-text', color: 'blue' },
  { type: 'design', label: 'Design', icon: 'palette', color: 'purple' },
  { type: 'staging', label: 'Staging Site', icon: 'globe', color: 'orange' },
  { type: 'production', label: 'Production', icon: 'globe', color: 'green' },
  { type: 'repository', label: 'Repository', icon: 'git-branch', color: 'gray' },
  { type: 'video', label: 'Video', icon: 'video', color: 'red' },
  { type: 'spreadsheet', label: 'Spreadsheet', icon: 'table', color: 'green' },
  { type: 'presentation', label: 'Presentation', icon: 'presentation', color: 'amber' },
  { type: 'prototype', label: 'Prototype', icon: 'layers', color: 'indigo' },
  { type: 'other', label: 'Other', icon: 'link', color: 'gray' },
];
