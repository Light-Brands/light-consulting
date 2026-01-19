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

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
        { data: null, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { data: null, error: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const fileExtension = file.name.split('.').pop() || getExtensionFromMime(file.type);
    const uniqueFilename = `${folder}/${uuidv4()}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('project-images')
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return NextResponse.json(
        { data: null, error: error.message },
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
        filename: file.name,
        size: file.size,
        type: file.type,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
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
