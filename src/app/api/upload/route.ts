/**
 * Image Upload API Route
 * Light Brand Consulting
 *
 * Handles image uploads to Supabase Storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

// POST - Upload an image
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Storage is not configured. Please set up Supabase.' },
        { status: 503 }
      );
    }

    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || 'projects';

    if (!file) {
      return NextResponse.json(
        { data: null, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { data: null, error: 'File size exceeds 50MB limit' },
        { status: 400 }
      );
    }

    // Handle pasted images that might not have a MIME type or filename
    let mimeType = file.type;
    let fileExtension: string;

    // If no MIME type, try to detect from file name or default to PNG (common for screenshots)
    if (!mimeType || mimeType === 'application/octet-stream') {
      const fileName = file.name || '';
      if (fileName.toLowerCase().endsWith('.png')) {
        mimeType = 'image/png';
      } else if (fileName.toLowerCase().endsWith('.jpg') || fileName.toLowerCase().endsWith('.jpeg')) {
        mimeType = 'image/jpeg';
      } else if (fileName.toLowerCase().endsWith('.gif')) {
        mimeType = 'image/gif';
      } else if (fileName.toLowerCase().endsWith('.webp')) {
        mimeType = 'image/webp';
      } else if (fileName.toLowerCase().endsWith('.svg')) {
        mimeType = 'image/svg+xml';
      } else {
        // Default to PNG for pasted screenshots
        mimeType = 'image/png';
      }
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      console.error('Invalid MIME type:', mimeType, 'File name:', file.name, 'File size:', file.size);
      return NextResponse.json(
        { data: null, error: `Invalid file type: ${mimeType}. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate a unique filename
    // Handle cases where file.name might be empty (pasted images)
    if (file.name && file.name.includes('.')) {
      fileExtension = file.name.split('.').pop() || getExtensionFromMime(mimeType);
    } else {
      fileExtension = getExtensionFromMime(mimeType);
    }
    const uniqueFilename = `${folder}/${uuidv4()}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if bucket exists, create if it doesn't
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.id === 'project-images');
    
    if (!bucketExists) {
      console.error('Storage bucket "project-images" does not exist');
      return NextResponse.json(
        { 
          data: null, 
          error: 'Storage bucket "project-images" not found. Please run the migration: supabase/migrations/create-storage-bucket.sql' 
        },
        { status: 500 }
      );
    }

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('project-images')
      .upload(uniqueFilename, buffer, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      console.error('Upload details:', {
        filename: uniqueFilename,
        mimeType,
        fileSize: file.size,
        originalName: file.name,
        bucketExists,
      });
      
      // Provide more helpful error messages
      let errorMessage = error.message || 'Failed to upload file to storage';
      if (error.message?.includes('bucket') || error.message?.includes('not found')) {
        errorMessage = 'Storage bucket "project-images" not found. Please run the migration: supabase/migrations/create-storage-bucket.sql';
      }
      
      return NextResponse.json(
        { data: null, error: errorMessage },
        { status: 500 }
      );
    }

    // Get the public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('project-images')
      .getPublicUrl(data.path);

    return NextResponse.json({
      data: {
        path: data.path,
        url: urlData.publicUrl,
        filename: file.name || `${uniqueFilename}`,
        size: file.size,
        type: mimeType,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error stack:', errorStack);
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Remove an image
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Storage is not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { data: null, error: 'No path provided' },
        { status: 400 }
      );
    }

    // Delete from Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from('project-images')
      .remove([path]);

    if (error) {
      console.error('Supabase storage delete error:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: { deleted: path },
      error: null,
    });
  } catch (error) {
    console.error('Error in DELETE /api/upload:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to get file extension from MIME type
function getExtensionFromMime(mimeType: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  };
  return mimeToExt[mimeType] || 'jpg';
}
