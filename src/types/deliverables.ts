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

export type DeliverablePriority = 'urgent' | 'high' | 'medium' | 'low';

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
  milestone_id: string | null;
  name: string;
  description: string | null;
  status: DeliverableStatus;
  priority: DeliverablePriority;
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
  milestone_id?: string | null;
  name: string;
  description?: string | null;
  status?: DeliverableStatus;
  priority?: DeliverablePriority;
  due_date?: string | null;
  assigned_to?: string | null;
  sort_order?: number;
}

export interface DeliverableUpdate {
  phase_id?: string | null;
  milestone_id?: string | null;
  name?: string;
  description?: string | null;
  status?: DeliverableStatus;
  priority?: DeliverablePriority;
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
  assigned_to_email?: string;
  phase_name?: string;
  milestone_name?: string;
}

// ============================================================================
// Deliverables by Status (for Kanban view)
// ============================================================================

export interface DeliverablesByStatus {
  pending: DeliverableWithAssignee[];
  in_progress: DeliverableWithAssignee[];
  review: DeliverableWithAssignee[];
  completed: DeliverableWithAssignee[];
}

// ============================================================================
// Status Configuration (for UI)
// ============================================================================

export interface DeliverableStatusConfig {
  value: DeliverableStatus;
  label: string;
  color: string;
}

export const DELIVERABLE_STATUS_CONFIGS: DeliverableStatusConfig[] = [
  { value: 'pending', label: 'Pending', color: 'gray' },
  { value: 'in_progress', label: 'In Progress', color: 'blue' },
  { value: 'review', label: 'In Review', color: 'purple' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'gray' },
];

export interface DeliverablePriorityConfig {
  value: DeliverablePriority;
  label: string;
  color: string;
  bgColor: string;
}

export const DELIVERABLE_PRIORITY_CONFIGS: DeliverablePriorityConfig[] = [
  { value: 'urgent', label: 'Urgent', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  { value: 'high', label: 'High', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { value: 'low', label: 'Low', color: 'text-gray-400', bgColor: 'bg-gray-500/10' },
];

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
