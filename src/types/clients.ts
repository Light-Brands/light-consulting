/**
 * Client Entity Type Definitions
 * Light Brand Consulting
 *
 * Clients are top-level entities representing people or companies.
 * Hierarchy: Client -> Project -> Proposal -> Phases/Milestones
 */

// ============================================================================
// Client Status
// ============================================================================

export type ClientStatus = 'active' | 'inactive' | 'archived';

// ============================================================================
// Client Entity
// ============================================================================

export interface Client {
  id: string;
  client_name: string;
  client_email: string;
  client_company: string | null;
  client_phone: string | null;
  website_url: string | null;
  logo_url: string | null;
  industry: string | null;
  notes: string | null;
  status: ClientStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ClientInsert {
  client_name: string;
  client_email: string;
  client_company?: string | null;
  client_phone?: string | null;
  website_url?: string | null;
  logo_url?: string | null;
  industry?: string | null;
  notes?: string | null;
  status?: ClientStatus;
  metadata?: Record<string, unknown>;
}

export interface ClientUpdate {
  client_name?: string;
  client_email?: string;
  client_company?: string | null;
  client_phone?: string | null;
  website_url?: string | null;
  logo_url?: string | null;
  industry?: string | null;
  notes?: string | null;
  status?: ClientStatus;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Client with Statistics
// ============================================================================

export interface ClientWithStats extends Client {
  project_count: number;
  proposal_count: number;
  active_projects: number;
  total_value: number;
  total_paid: number;
  last_project_date: string | null;
}

// ============================================================================
// Client Summary (for lists)
// ============================================================================

export interface ClientSummary {
  id: string;
  client_name: string;
  client_email: string;
  client_company: string | null;
  logo_url: string | null;
  status: ClientStatus;
  project_count: number;
  active_projects: number;
  total_value: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ClientsApiResponse {
  data: Client[] | ClientSummary[] | null;
  error: string | null;
  count?: number;
}

export interface ClientApiResponse {
  data: Client | null;
  error: string | null;
}

export interface ClientWithStatsApiResponse {
  data: ClientWithStats | null;
  error: string | null;
}
