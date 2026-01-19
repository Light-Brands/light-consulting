/**
 * ImageUpload Component
 * Light Brand Consulting
 *
 * Supports:
 * - Paste from clipboard (Ctrl+V / Cmd+V)
 * - Drag and drop
 * - Click to upload
 * - Image preview
 * - Remove/replace functionality
 */

'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  helpText?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = 'projects',
  label = 'Cover Image',
  helpText,
  className = '',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { authFetch } = useAuthFetch();

  // Update preview when value changes externally
  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  // Handle file upload
  const uploadFile = useCallback(async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, WebP, or SVG image.');
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit.');
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      // Upload the file
      const response = await authFetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
        headers: {},
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to upload image');
      }

      // Update the value with the new URL
      setPreviewUrl(result.data.url);
      onChange(result.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [authFetch, folder, onChange]);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  // Handle click to open file picker
  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    } else {
      setError('Please drop an image file.');
    }
  };

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      // Only handle paste if the drop zone or its children are focused
      if (!dropZoneRef.current?.contains(document.activeElement) &&
          document.activeElement !== dropZoneRef.current) {
        return;
      }

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            uploadFile(file);
          }
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [uploadFile]);

  // Handle remove image
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onChange(null);
    setError(null);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      {helpText && (
        <p className="text-text-muted text-xs mb-2">{helpText}</p>
      )}

      <div
        ref={dropZoneRef}
        tabIndex={0}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed transition-all
          focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:ring-offset-2 focus:ring-offset-depth-base
          ${isDragging
            ? 'border-radiance-gold bg-radiance-gold/10'
            : 'border-depth-border hover:border-text-muted bg-depth-elevated'
          }
          ${isUploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        {previewUrl ? (
          // Image preview
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={previewUrl.includes('supabase')}
            />
            {/* Remove button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-depth-base/80 hover:bg-red-500 rounded-full transition-colors group"
              title="Remove image"
            >
              <svg
                className="w-4 h-4 text-text-primary group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Replace overlay on hover */}
            <div className="absolute inset-0 bg-depth-base/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-text-primary font-medium">Click to replace</span>
            </div>
          </div>
        ) : (
          // Upload prompt
          <div className="flex flex-col items-center justify-center py-10 px-6">
            {isUploading ? (
              <>
                <div className="w-10 h-10 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-text-secondary text-sm">Uploading...</p>
              </>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-text-muted mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-text-primary font-medium mb-1">
                  Drop image here, paste, or click to upload
                </p>
                <p className="text-text-muted text-sm">
                  JPEG, PNG, GIF, WebP, or SVG (max 5MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {/* URL display for reference */}
      {previewUrl && (
        <div className="mt-2">
          <input
            type="text"
            value={previewUrl}
            readOnly
            className="w-full px-3 py-2 bg-depth-base border border-depth-border rounded-lg text-text-muted text-xs font-mono"
            onClick={(e) => {
              e.stopPropagation();
              (e.target as HTMLInputElement).select();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
