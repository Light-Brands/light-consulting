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
  created_at: string;
  updated_at: string;
}

export interface TeamOverheadInsert {
  name: string;
  role?: string | null;
  monthly_cost: number;
  cost_type: CostType;
  notes?: string | null;
}

export interface TeamOverheadUpdate {
  name?: string;
  role?: string | null;
  monthly_cost?: number;
  cost_type?: CostType;
  notes?: string | null;
  is_active?: boolean;
}

// OpEx Summary
export interface OpExSummary {
  service_costs_total: number;
  team_overhead_total: number;
  grand_total: number;
  service_count: number;
  team_count: number;
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

// Helper to get category config
export function getCategoryConfig(category: ServiceCategory): CategoryConfig {
  return CATEGORY_CONFIGS.find(c => c.value === category) || CATEGORY_CONFIGS[CATEGORY_CONFIGS.length - 1];
}

// Helper to get cost type config
export function getCostTypeConfig(costType: CostType): CostTypeConfig {
  return COST_TYPE_CONFIGS.find(c => c.value === costType) || COST_TYPE_CONFIGS[0];
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
