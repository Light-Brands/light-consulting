/**
 * Planning Types
 * Light Brand Consulting
 */

export interface PlanningDoc {
  id: string;
  fileName: string;
  title: string;
  relativePath: string;
  content: string;
}

export interface PlanningDocFolder {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: PlanningDocFolder[];
}

export type BrandStatus = 'active' | 'planning' | 'paused' | 'archived' | 'concept';

export interface PlanningBrand {
  slug: string;
  brandName: string;
  description: string;
  type: string;
  status: string;
  tags: string[];
  councilStatus: string;
  docCount: number;
  tree: PlanningDocFolder[];
  docs: PlanningDoc[];
}
