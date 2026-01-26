# Project Tracker - Type Definitions

## proposals.ts (Additions)

```typescript
// Add phase status to existing ProposalPhase interface
export type PhaseStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

// Extended proposal fields
export interface ProposalUpdate {
  // ... existing fields ...
  progress_percentage?: number;
  last_activity_at?: string | null;
  portfolio_project_id?: string | null;
}

// Command Center aggregated view
export interface ActiveProjectSummary {
  id: string;
  project_name: string;
  client_name: string;
  client_company: string | null;
  status: ProposalStatus;
  progress_percentage: number;

  // Phase tracking
  total_phases: number;
  completed_phases: number;
  current_phase: string | null;

  // Milestone tracking
  total_milestones: number;
  completed_milestones: number;

  // Financial
  total_amount: number;
  paid_amount: number;
  pending_amount: number;

  // Timeline
  start_date: string | null;
  estimated_completion_date: string | null;
  days_since_update: number;

  // Next action
  next_milestone: {
    id: string;
    name: string;
    due_date: string | null;
    status: MilestoneStatus;
  } | null;

  // Risk indicators
  is_overdue: boolean;
  is_stale: boolean; // No updates in 7+ days
  has_blocked_items: boolean;

  // Team
  assigned_team: TeamMemberSummary[];
}

export interface CommandCenterStats {
  total_active_projects: number;
  total_pipeline_value: number;
  collected_amount: number;
  pending_amount: number;
  projects_on_track: number;
  projects_at_risk: number;
  upcoming_deadlines: number; // Milestones due in next 7 days
}
```

---

## users.ts (NEW)

```typescript
// System roles
export type SystemRole = 'super_admin' | 'admin' | 'developer' | 'manager' | 'client';

// Project-specific roles
export type ProjectRole = 'owner' | 'admin' | 'developer' | 'manager' | 'client_admin' | 'client_viewer';

// User status
export type UserStatus = 'active' | 'inactive' | 'pending_verification';

// User profile
export interface UserProfile {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  avatar_url: string | null;
  system_role: SystemRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  invited_by: string | null;
  invited_at: string | null;
}

// Project membership
export interface ProjectMember {
  id: string;
  proposal_id: string;
  user_id: string;
  project_role: ProjectRole;
  permissions: ProjectPermissions;
  assigned_by: string | null;
  assigned_at: string;
  notify_on_updates: boolean;
  notify_on_milestones: boolean;

  // Joined data
  user?: UserProfile;
}

export interface ProjectPermissions {
  view_proposal: boolean;
  view_progress: boolean;
  view_financials: boolean;
  approve_proposal: boolean;
  make_payments: boolean;
  manage_team: boolean;
  update_status: boolean;
  add_deliverables: boolean;
}

// Summary for display
export interface TeamMemberSummary {
  id: string;
  name: string;
  role: ProjectRole;
  avatar_url: string | null;
}

// Invitation
export interface UserInvitation {
  id: string;
  email: string;
  full_name: string | null;
  invited_role: ProjectRole;
  proposal_id: string | null;
  invitation_token: string;
  invited_by: string;
  invited_at: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  accepted_at: string | null;
}
```

---

## deliverables.ts (NEW)

```typescript
// Link types
export type DeliverableLinkType =
  | 'live_site'
  | 'staging'
  | 'documentation'
  | 'assets'
  | 'repository'
  | 'credentials'
  | 'video'
  | 'other';

// Deliverable status
export type DeliverableStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'blocked';

// Deliverable link
export interface DeliverableLink {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  milestone_id: string | null;
  title: string;
  url: string;
  description: string | null;
  link_type: DeliverableLinkType;
  is_public: boolean;
  is_active: boolean;
  visible_to_client: boolean;
  made_visible_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  click_count: number;
  last_clicked_at: string | null;

  // Joined data
  phase?: { title: string };
  milestone?: { milestone_name: string };
}

// Individual deliverable item
export interface Deliverable {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  title: string;
  description: string | null;
  status: DeliverableStatus;
  assigned_to: string | null;
  assigned_at: string | null;
  due_date: string | null;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;

  // Joined data
  assignee?: UserProfile;
  links?: DeliverableLink[];
}

// For creating new links
export interface CreateDeliverableLinkInput {
  proposal_id: string;
  phase_id?: string;
  milestone_id?: string;
  title: string;
  url: string;
  description?: string;
  link_type: DeliverableLinkType;
  visible_to_client?: boolean;
}
```

---

## todos.ts (NEW)

```typescript
// Todo types
export type TodoType = 'task' | 'deliverable' | 'admin' | 'follow_up' | 'review' | 'meeting' | 'financial';
export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TodoStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'deferred';

// Todo item
export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  todo_type: TodoType;
  priority: TodoPriority;
  status: TodoStatus;
  due_date: string | null;
  due_time: string | null;
  completed_at: string | null;

  // Linked entities
  proposal_id: string | null;
  internal_project_id: string | null;
  deliverable_id: string | null;
  phase_id: string | null;
  milestone_id: string | null;

  // Assignment
  assigned_by: string | null;
  assigned_at: string | null;

  // Recurrence
  is_recurring: boolean;
  recurrence_pattern: string | null;

  notes: string | null;
  created_at: string;
  updated_at: string;

  // Joined data
  user?: UserProfile;
  assignee?: UserProfile;
  linked_project_name?: string;
  linked_internal_project_name?: string;
  linked_deliverable_name?: string;
}

// For creating todos
export interface CreateTodoInput {
  title: string;
  description?: string;
  todo_type?: TodoType;
  priority?: TodoPriority;
  due_date?: string;
  due_time?: string;
  proposal_id?: string;
  internal_project_id?: string;
  deliverable_id?: string;
  notes?: string;
}

// For assigning todos
export interface AssignTodoInput {
  user_id: string;
  title: string;
  description?: string;
  todo_type?: TodoType;
  priority?: TodoPriority;
  due_date?: string;
  proposal_id?: string;
}

// Next action (quick capture)
export interface NextAction {
  id: string;
  action_text: string;
  assigned_to: string | null;
  context_type: string | null;
  context_notes: string | null;
  proposal_id: string | null;
  internal_project_id: string | null;
  status: 'pending' | 'completed' | 'converted_to_todo' | 'cancelled';
  converted_to_todo_id: string | null;
  due_date: string | null;
  created_by: string | null;
  created_at: string;
  completed_at: string | null;

  // Joined data
  assignee?: UserProfile;
}

// Team workload summary
export interface TeamMemberWorkload {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  pending_count: number;
  in_progress_count: number;
  high_priority_count: number;
  urgent_count: number;
  due_today_count: number;
  overdue_count: number;
}

// My dashboard data
export interface MyDashboardData {
  user: UserProfile;
  todos: {
    urgent: Todo[];
    due_today: Todo[];
    from_projects: Todo[];
    admin_tasks: Todo[];
    completed_today: Todo[];
  };
  assigned_projects: {
    id: string;
    name: string;
    role: string;
    active_deliverables_count: number;
  }[];
  stats: {
    total_pending: number;
    completed_this_week: number;
    overdue: number;
  };
}
```

---

## projects.ts (NEW)

```typescript
// Project categories
export type ProjectCategory =
  | 'client'
  | 'prospect'
  | 'internal'
  | 'personal_brand'
  | 'core_offer'
  | 'service_provider'
  | 'archived';

// Internal project status
export type InternalProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';

// Internal project (non-client)
export interface InternalProject {
  id: string;
  title: string;
  description: string | null;
  project_category: ProjectCategory;
  status: InternalProjectStatus;
  target_date: string | null;
  completed_at: string | null;
  notes: string | null;
  tags: string[];
  owner_id: string | null;
  created_at: string;
  updated_at: string;

  // Joined data
  owner?: UserProfile;
  todos?: Todo[];
  deliverables?: Deliverable[];
}

// Unified project view (combines proposals and internal projects)
export interface UnifiedProject {
  id: string;
  type: 'proposal' | 'internal';
  title: string;
  category: ProjectCategory;
  status: string;
  is_on_hold: boolean;
  progress_percentage: number;
  owner?: UserProfile;
  client_name?: string;
  client_company?: string;
  next_action?: string;
  updated_at: string;
}

// Command center filters
export interface ProjectFilters {
  category?: ProjectCategory;
  status?: string;
  is_on_hold?: boolean;
  assigned_to?: string;
  search?: string;
}
```

---

## client-portal.ts (NEW)

```typescript
import { ProposalStatus, PhaseStatus, DeliverableStatus, DeliverableLink, TeamMemberSummary } from './';

// Client's view of a project
export interface ClientProject {
  id: string;
  project_name: string;
  status: ProposalStatus;
  progress_percentage: number;
  current_phase: string | null;

  // Summary stats
  total_phases: number;
  completed_phases: number;
  total_milestones: number;
  completed_milestones: number;

  // Financial (client view)
  total_amount: number;
  paid_amount: number;
  next_payment: {
    milestone_name: string;
    amount: number;
    due_date: string | null;
  } | null;

  // Deliverables count
  deliverable_links_count: number;

  // Timeline
  estimated_completion_date: string | null;
  last_update_at: string | null;
}

// Client's detailed project view
export interface ClientProjectDetail extends ClientProject {
  // Phases with deliverables
  phases: ClientPhase[];

  // All visible deliverable links
  deliverable_links: DeliverableLink[];

  // Milestones with payment status
  milestones: ClientMilestone[];

  // Recent activity
  activity: ClientActivityItem[];

  // Team working on project
  team: TeamMemberSummary[];
}

export interface ClientPhase {
  id: string;
  title: string;
  status: PhaseStatus;
  sort_order: number;
  deliverables: ClientDeliverable[];
  links: DeliverableLink[];
}

export interface ClientDeliverable {
  id: string;
  title: string;
  status: DeliverableStatus;
  completed_at: string | null;
}

export interface ClientMilestone {
  id: string;
  milestone_name: string;
  amount: number;
  payment_status: 'pending' | 'paid' | 'overdue';
  due_date: string | null;
  can_pay: boolean;  // True if this is the next payable milestone
}

export interface ClientActivityItem {
  id: string;
  action: string;
  description: string;
  created_at: string;
  user_name: string;
}
```
