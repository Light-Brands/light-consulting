/**
 * Team Todo System Type Definitions
 * Light Brand Consulting
 */

// ============================================================================
// Enums / Union Types
// ============================================================================

export type TodoStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RecurrencePattern = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';

// ============================================================================
// Todos
// ============================================================================

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  assigned_to: string | null;
  created_by: string | null;
  proposal_id: string | null;
  internal_project_id: string | null;
  phase_id: string | null;
  milestone_id: string | null;
  due_date: string | null;
  completed_at: string | null;
  is_recurring: boolean;
  recurrence_pattern: RecurrencePattern | null;
  tags: string[] | null;
  estimated_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface TodoInsert {
  title: string;
  description?: string | null;
  status?: TodoStatus;
  priority?: TodoPriority;
  assigned_to?: string | null;
  created_by?: string | null;
  proposal_id?: string | null;
  internal_project_id?: string | null;
  phase_id?: string | null;
  milestone_id?: string | null;
  due_date?: string | null;
  is_recurring?: boolean;
  recurrence_pattern?: RecurrencePattern | null;
  tags?: string[] | null;
  estimated_minutes?: number | null;
}

export interface TodoUpdate {
  title?: string;
  description?: string | null;
  status?: TodoStatus;
  priority?: TodoPriority;
  assigned_to?: string | null;
  proposal_id?: string | null;
  internal_project_id?: string | null;
  phase_id?: string | null;
  milestone_id?: string | null;
  due_date?: string | null;
  completed_at?: string | null;
  is_recurring?: boolean;
  recurrence_pattern?: RecurrencePattern | null;
  tags?: string[] | null;
  estimated_minutes?: number | null;
}

// ============================================================================
// Next Actions (Quick per-project actions)
// ============================================================================

export interface NextAction {
  id: string;
  proposal_id: string;
  action_text: string;
  is_completed: boolean;
  completed_at: string | null;
  completed_by: string | null;
  assigned_to: string | null;
  due_date: string | null;
  sort_order: number;
  created_by: string | null;
  created_at: string;
}

export interface NextActionInsert {
  proposal_id: string;
  action_text: string;
  is_completed?: boolean;
  assigned_to?: string | null;
  due_date?: string | null;
  sort_order?: number;
  created_by?: string | null;
}

export interface NextActionUpdate {
  action_text?: string;
  is_completed?: boolean;
  completed_at?: string | null;
  completed_by?: string | null;
  assigned_to?: string | null;
  due_date?: string | null;
  sort_order?: number;
}

// ============================================================================
// With Related Data (View types)
// ============================================================================

export interface TodoWithContext extends Todo {
  project_name?: string;
  client_name?: string;
  internal_project_name?: string;
  assigned_to_name?: string;
  created_by_name?: string;
}

export interface NextActionWithContext extends NextAction {
  project_name?: string;
  client_name?: string;
  assigned_to_name?: string;
  created_by_name?: string;
}

// ============================================================================
// Team Workload
// ============================================================================

export interface TeamMemberWorkload {
  user_profile_id: string;
  full_name: string;
  email: string;
  active_todos: number;
  urgent_todos: number;
  overdue_todos: number;
  active_projects: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface TodosApiResponse {
  data: Todo[] | null;
  error: string | null;
  count?: number;
}

export interface TodoApiResponse {
  data: Todo | null;
  error: string | null;
}

export interface NextActionsApiResponse {
  data: NextAction[] | null;
  error: string | null;
}

export interface TeamWorkloadApiResponse {
  data: TeamMemberWorkload[] | null;
  error: string | null;
}

// ============================================================================
// Filter & Sort Options
// ============================================================================

export interface TodoFilters {
  status?: TodoStatus | TodoStatus[];
  priority?: TodoPriority | TodoPriority[];
  assigned_to?: string;
  proposal_id?: string;
  internal_project_id?: string;
  due_before?: string;
  due_after?: string;
  include_completed?: boolean;
}

export type TodoSortField = 'due_date' | 'priority' | 'created_at' | 'title' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface TodoSort {
  field: TodoSortField;
  direction: SortDirection;
}

// ============================================================================
// Priority Configuration (for UI)
// ============================================================================

export interface PriorityConfig {
  value: TodoPriority;
  label: string;
  color: string;
  bgColor: string;
}

export const PRIORITY_CONFIGS: PriorityConfig[] = [
  { value: 'urgent', label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' },
  { value: 'high', label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'medium', label: 'Medium', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { value: 'low', label: 'Low', color: 'text-gray-600', bgColor: 'bg-gray-100' },
];

export const STATUS_CONFIGS: { value: TodoStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'text-gray-600' },
  { value: 'in_progress', label: 'In Progress', color: 'text-blue-600' },
  { value: 'completed', label: 'Completed', color: 'text-green-600' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-gray-400' },
];
