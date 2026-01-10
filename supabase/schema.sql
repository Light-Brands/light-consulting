-- ============================================================================
-- Light Brand Consulting - Portfolio Projects Schema
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Projects Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  case_study_url TEXT,
  client_name VARCHAR(255),
  industry VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- ============================================================================
-- Trigger for updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published projects
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can do everything
CREATE POLICY "Authenticated users have full access"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- Sample Data (Optional - for development)
-- ============================================================================

INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order)
VALUES
  (
    'AI-Powered Sales Intelligence System',
    'Developed a comprehensive AI system that analyzes customer behavior patterns and predicts optimal engagement timing, resulting in a 40% increase in conversion rates.',
    '/images/portfolio/project-sales-ai.jpg',
    ARRAY['AI', 'Sales', 'Analytics', 'Automation'],
    '/insights/case-study-sales-ai',
    'Growth Mastery AI',
    'Professional Services',
    true,
    'published',
    1
  ),
  (
    'Automated Content Production Engine',
    'Built an intelligent content engine that generates, schedules, and optimizes marketing content across multiple channels, reducing content creation time by 75%.',
    '/images/portfolio/project-content-engine.jpg',
    ARRAY['AI', 'Content', 'Marketing', 'Automation'],
    '/insights/case-study-content-engine',
    'MediaFlow Studios',
    'Media & Entertainment',
    true,
    'published',
    2
  ),
  (
    'Healthcare Patient Journey Optimizer',
    'Implemented an AI-driven patient management system that streamlines intake, follow-ups, and care coordination, improving patient satisfaction by 60%.',
    '/images/portfolio/project-healthcare.jpg',
    ARRAY['AI', 'Healthcare', 'Patient Care', 'Workflow'],
    '/insights/case-study-healthcare',
    'Wellness Partners Medical',
    'Healthcare & Life Sciences',
    false,
    'published',
    3
  ),
  (
    'E-commerce Inventory Intelligence',
    'Created a predictive inventory management system using AI to forecast demand, optimize stock levels, and reduce overstock costs by 35%.',
    '/images/portfolio/project-ecommerce.jpg',
    ARRAY['AI', 'E-commerce', 'Inventory', 'Prediction'],
    NULL,
    'RetailEdge Inc.',
    'E-commerce & Retail',
    false,
    'published',
    4
  ),
  (
    'Financial Advisory AI Assistant',
    'Developed an AI-powered advisory tool that provides personalized investment recommendations and market insights for wealth management clients.',
    '/images/portfolio/project-finance.jpg',
    ARRAY['AI', 'Finance', 'Advisory', 'Investment'],
    NULL,
    'Prosperity Wealth Advisors',
    'Financial Services',
    true,
    'published',
    5
  ),
  (
    'Manufacturing Quality Control System',
    'Implemented computer vision-based quality control that detects defects in real-time, reducing production errors by 90% and saving millions in recalls.',
    '/images/portfolio/project-manufacturing.jpg',
    ARRAY['AI', 'Manufacturing', 'Quality Control', 'Computer Vision'],
    NULL,
    'PrecisionTech Manufacturing',
    'Manufacturing & Logistics',
    false,
    'published',
    6
  )
ON CONFLICT DO NOTHING;
