-- Migration: Add project_group column to projects table
-- Run this in Supabase SQL Editor or via migration tool

-- Add the project_group column with default value 'past'
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS project_group VARCHAR(50) DEFAULT 'past'
CHECK (project_group IN ('featured', 'new', 'past'));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_project_group ON projects(project_group);
