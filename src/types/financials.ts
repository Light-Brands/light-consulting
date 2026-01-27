// Types for Financial Tracking (OpEx Management)

// Service cost categories
export type ServiceCategory =
  | 'software'
  | 'infrastructure'
  | 'ai_tools'
  | 'development'
  | 'communication'
  | 'other';

// Team overhead cost types
export type CostType = 'salary' | 'contractor' | 'stipend';

// Fixed cost categories
export type FixedCostCategory = 'marketing' | 'loan' | 'equipment' | 'legal' | 'insurance' | 'other';

// Service Cost interfaces
export interface ServiceCost {
  id: string;
  name: string;
  vendor: string | null;
  category: ServiceCategory;
  unit_cost: number;
  unit_type: string;
  quantity: number;
  monthly_cost: number; // Computed column
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCostInsert {
  name: string;
  vendor?: string | null;
  category: ServiceCategory;
  unit_cost: number;
  unit_type?: string;
  quantity?: number;
  notes?: string | null;
}

export interface ServiceCostUpdate {
  name?: string;
  vendor?: string | null;
  category?: ServiceCategory;
  unit_cost?: number;
  unit_type?: string;
  quantity?: number;
  notes?: string | null;
  is_active?: boolean;
}

// Team Overhead interfaces
export interface TeamOverhead {
  id: string;
  name: string;
  role: string | null;
  monthly_cost: number;
  cost_type: CostType;
  notes: string | null;
  is_active: boolean;
  order_index: number;
  start_date: string | null; // NULL or past = current, future = upcoming
  created_at: string;
  updated_at: string;
}

export interface TeamOverheadInsert {
  name: string;
  role?: string | null;
  monthly_cost: number;
  cost_type: CostType;
  notes?: string | null;
  start_date?: string | null;
}

export interface TeamOverheadUpdate {
  name?: string;
  role?: string | null;
  monthly_cost?: number;
  cost_type?: CostType;
  notes?: string | null;
  is_active?: boolean;
  start_date?: string | null;
}

// Fixed Cost interfaces
export interface FixedCost {
  id: string;
  name: string;
  description: string | null;
  category: FixedCostCategory;
  total_amount: number;
  start_date: string;
  end_date: string;
  monthly_amount: number; // Computed column
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FixedCostInsert {
  name: string;
  description?: string | null;
  category: FixedCostCategory;
  total_amount: number;
  start_date: string;
  end_date: string;
  notes?: string | null;
}

export interface FixedCostUpdate {
  name?: string;
  description?: string | null;
  category?: FixedCostCategory;
  total_amount?: number;
  start_date?: string;
  end_date?: string;
  notes?: string | null;
  is_active?: boolean;
}

// Loan interfaces
export interface Loan {
  id: string;
  lender_name: string;
  lender_contact: string | null;
  original_amount: number;
  current_balance: number;
  interest_rate: number;
  monthly_payment: number;
  start_date: string;
  maturity_date: string;
  payment_day: number;
  terms: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoanInsert {
  lender_name: string;
  lender_contact?: string | null;
  original_amount: number;
  current_balance: number;
  interest_rate?: number;
  monthly_payment: number;
  start_date: string;
  maturity_date: string;
  payment_day?: number;
  terms?: string | null;
}

export interface LoanUpdate {
  lender_name?: string;
  lender_contact?: string | null;
  original_amount?: number;
  current_balance?: number;
  interest_rate?: number;
  monthly_payment?: number;
  start_date?: string;
  maturity_date?: string;
  payment_day?: number;
  terms?: string | null;
  is_active?: boolean;
}

export interface LoansApiResponse {
  data: Loan[] | null;
  error: string | null;
}

export interface LoanApiResponse {
  data: Loan | null;
  error: string | null;
}

// OpEx Summary
export interface OpExSummary {
  service_costs_total: number;
  team_overhead_total: number;
  upcoming_team_total: number;
  fixed_costs_total: number; // Active fixed costs monthly total
  grand_total: number;
  projected_total: number; // grand_total + upcoming_team_total
  service_count: number;
  team_count: number;
  upcoming_team_count: number;
  fixed_costs_count: number;
}

// API Response types
export interface ServiceCostsApiResponse {
  data: ServiceCost[] | null;
  error: string | null;
}

export interface ServiceCostApiResponse {
  data: ServiceCost | null;
  error: string | null;
}

export interface TeamOverheadApiResponse {
  data: TeamOverhead[] | null;
  error: string | null;
}

export interface TeamOverheadSingleApiResponse {
  data: TeamOverhead | null;
  error: string | null;
}

export interface OpExSummaryApiResponse {
  data: OpExSummary | null;
  error: string | null;
}

export interface FixedCostsApiResponse {
  data: FixedCost[] | null;
  error: string | null;
}

export interface FixedCostApiResponse {
  data: FixedCost | null;
  error: string | null;
}

// Configuration for category display
export interface CategoryConfig {
  value: ServiceCategory;
  label: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  { value: 'software', label: 'Software', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { value: 'infrastructure', label: 'Infrastructure', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { value: 'ai_tools', label: 'AI Tools', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { value: 'development', label: 'Development', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'communication', label: 'Communication', color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  { value: 'other', label: 'Other', color: 'text-gray-600', bgColor: 'bg-gray-100' },
];

// Configuration for cost type display
export interface CostTypeConfig {
  value: CostType;
  label: string;
  color: string;
  bgColor: string;
}

export const COST_TYPE_CONFIGS: CostTypeConfig[] = [
  { value: 'salary', label: 'Salary', color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: 'contractor', label: 'Contractor', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { value: 'stipend', label: 'Stipend', color: 'text-amber-600', bgColor: 'bg-amber-100' },
];

// Configuration for fixed cost category display
export interface FixedCostCategoryConfig {
  value: FixedCostCategory;
  label: string;
  color: string;
  bgColor: string;
}

export const FIXED_COST_CATEGORY_CONFIGS: FixedCostCategoryConfig[] = [
  { value: 'marketing', label: 'Marketing', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
  { value: 'loan', label: 'Loan', color: 'text-red-400', bgColor: 'bg-red-500/20' },
  { value: 'equipment', label: 'Equipment', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
  { value: 'legal', label: 'Legal', color: 'text-violet-400', bgColor: 'bg-violet-500/20' },
  { value: 'insurance', label: 'Insurance', color: 'text-teal-400', bgColor: 'bg-teal-500/20' },
  { value: 'other', label: 'Other', color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
];

// Helper to get category config
export function getCategoryConfig(category: ServiceCategory): CategoryConfig {
  return CATEGORY_CONFIGS.find(c => c.value === category) || CATEGORY_CONFIGS[CATEGORY_CONFIGS.length - 1];
}

// Helper to get cost type config
export function getCostTypeConfig(costType: CostType): CostTypeConfig {
  return COST_TYPE_CONFIGS.find(c => c.value === costType) || COST_TYPE_CONFIGS[0];
}

// Helper to get fixed cost category config
export function getFixedCostCategoryConfig(category: FixedCostCategory): FixedCostCategoryConfig {
  return FIXED_COST_CATEGORY_CONFIGS.find(c => c.value === category) || FIXED_COST_CATEGORY_CONFIGS[FIXED_COST_CATEGORY_CONFIGS.length - 1];
}

// Check if a fixed cost is currently active (within date range)
export function isFixedCostActive(cost: FixedCost): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(cost.start_date);
  const end = new Date(cost.end_date);
  return cost.is_active && start <= today && end >= today;
}

// Calculate remaining months for a fixed cost
export function getRemainingMonths(cost: FixedCost): number {
  const today = new Date();
  const end = new Date(cost.end_date);
  if (end < today) return 0;
  const months = (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth()) + 1;
  return Math.max(0, months);
}

// Calculate total duration in months
export function getTotalMonths(cost: FixedCost): number {
  const start = new Date(cost.start_date);
  const end = new Date(cost.end_date);
  return Math.max(1, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Check if a team member is upcoming (start_date is in the future)
export function isUpcomingTeamMember(member: TeamOverhead): boolean {
  if (!member.start_date) return false;
  const startDate = new Date(member.start_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return startDate > today;
}

// Format date for display
export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
