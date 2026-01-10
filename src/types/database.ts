/**
 * Supabase Database Type Definitions
 * Light Brand Consulting
 */

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
    };
  };
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  case_study_url: string | null;
  client_name: string | null;
  industry: string | null;
  featured: boolean;
  status: 'draft' | 'published';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectInsert {
  title: string;
  description: string;
  image_url?: string | null;
  tags?: string[];
  case_study_url?: string | null;
  client_name?: string | null;
  industry?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  sort_order?: number;
}

export interface ProjectUpdate {
  title?: string;
  description?: string;
  image_url?: string | null;
  tags?: string[];
  case_study_url?: string | null;
  client_name?: string | null;
  industry?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  sort_order?: number;
}

// API Response types
export interface ProjectsApiResponse {
  data: Project[] | null;
  error: string | null;
  count?: number;
}

export interface ProjectApiResponse {
  data: Project | null;
  error: string | null;
}
