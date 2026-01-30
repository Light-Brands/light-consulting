/**
 * Stack Diagnostic Tool Type Definitions
 * Light Brand Consulting
 */

// Tool categories for the diagnostic library
export type ToolCategory =
  | 'crm'
  | 'email'
  | 'project-management'
  | 'analytics'
  | 'social-media'
  | 'advertising'
  | 'website'
  | 'ecommerce'
  | 'accounting'
  | 'communication'
  | 'design'
  | 'automation';

// Connection types between tools
export type ConnectionType = 'native' | 'zapier' | 'manual' | 'broken' | 'none';

// Steps in the diagnostic flow
export type DiagnosticStep = 'template' | 'build' | 'analyze' | 'transform';

// A tool available in the diagnostic library
export interface DiagnosticTool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string; // emoji or icon identifier
  description: string;
  commonPairings?: string[]; // IDs of tools commonly used together
  monthlyPrice?: number;
}

// A tool placed on the canvas
export interface PlacedTool {
  id: string; // unique instance ID
  toolId: string; // references DiagnosticTool.id
  position: { x: number; y: number };
}

// A connection between two placed tools
export interface ToolConnection {
  id: string;
  sourceToolId: string; // PlacedTool.id
  targetToolId: string; // PlacedTool.id
  connectionType: ConnectionType;
  label?: string;
}

// An issue found during analysis
export interface Issue {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  affectedTools: string[]; // tool IDs
  category: 'data-silo' | 'manual-process' | 'redundancy' | 'missing-integration' | 'cost-waste' | 'security-risk';
}

// Result of running the analysis engine
export interface AnalysisResult {
  score: number; // 0-100 health score
  issues: Issue[];
  stats: {
    toolsSiloed: number;
    dataLostPercent: number;
    manualHoursPerWeek: number;
    leadsLostPercent: number;
    monthlyWaste: number;
  };
  painPoints: string[];
}

// A satellite in the integrated solution view
export interface Satellite {
  id: string;
  name: string;
  replaces: string[]; // names of tools it replaces
  features: string[];
  icon: string;
}

// The integrated solution shown in Step 4
export interface IntegratedSolution {
  name: string;
  description: string;
  hub: {
    name: string;
    features: string[];
    icon: string;
  };
  satellites: Satellite[];
  stats: {
    toolsSiloed: number;
    dataLostPercent: number;
    manualHoursPerWeek: number;
    leadsLostPercent: number;
    monthlySavings: number;
  };
}

// Industry template definition
export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultTools: string[]; // DiagnosticTool IDs
  defaultConnections: Array<{
    sourceToolId: string;
    targetToolId: string;
    connectionType: ConnectionType;
  }>;
  painPoints: string[];
  solution: IntegratedSolution;
}

// Database types for stack_sessions
export interface StackSession {
  id: string;
  lead_id: string | null;
  created_by: string | null;
  template_id: string;
  tools: PlacedTool[];
  connections: ToolConnection[];
  analysis: AnalysisResult | null;
  coach_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface StackSessionInsert {
  lead_id?: string | null;
  created_by?: string | null;
  template_id: string;
  tools: PlacedTool[];
  connections: ToolConnection[];
  analysis?: AnalysisResult | null;
  coach_notes?: string | null;
}

export interface StackSessionUpdate {
  lead_id?: string | null;
  created_by?: string | null;
  template_id?: string;
  tools?: PlacedTool[];
  connections?: ToolConnection[];
  analysis?: AnalysisResult | null;
  coach_notes?: string | null;
  updated_at?: string;
}
