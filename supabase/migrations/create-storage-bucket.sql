-- ============================================================================
-- Migration: Create Storage Bucket for Project Images
-- ============================================================================
-- This migration creates a storage bucket for project images with proper
-- access policies for public read and authenticated write.
-- ============================================================================

-- Create the storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,  -- Public bucket for read access
  5242880,  -- 5MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

-- ============================================================================
-- Storage Policies
-- ============================================================================

-- Policy: Anyone can view images (public read)
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Policy: Authenticated users can upload images
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images'
  AND auth.role() = 'authenticated'
);

-- Policy: Authenticated users can update their uploaded images
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images'
  AND auth.role() = 'authenticated'
);

-- Policy: Authenticated users can delete images
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images'
  AND auth.role() = 'authenticated'
);

-- ============================================================================
-- Summary
-- ============================================================================
-- This migration:
-- 1. Creates a public 'project-images' storage bucket
-- 2. Limits file size to 5MB
-- 3. Allows only image MIME types (jpeg, png, gif, webp, svg)
-- 4. Enables public read access for all images
-- 5. Restricts write/update/delete to authenticated users
-- ============================================================================
