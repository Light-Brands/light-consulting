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
      // Validate file type - be lenient for pasted screenshots
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      const fileType = file.type || '';
      
      // Allow pasted images even if they don't have a MIME type (common with screenshots)
      // The server will handle MIME type detection
      if (fileType && !allowedTypes.includes(fileType) && fileType !== 'application/octet-stream') {
        throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, WebP, or SVG image.');
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        throw new Error('File size exceeds 50MB limit.');
      }

      // Ensure file has a name (pasted images might not)
      let fileToUpload = file;
      if (!file.name) {
        // Create a File with a default name if it doesn't have one
        const blob = file.slice(0, file.size, file.type || 'image/png');
        fileToUpload = new File([blob], 'screenshot.png', { type: file.type || 'image/png' });
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('folder', folder);

      // Upload the file
      // authFetch will automatically detect FormData and not set Content-Type
      const response = await authFetch('/api/upload', {
        method: 'POST',
        body: formData,
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
      // Check if the drop zone is visible
      if (!dropZoneRef.current) return;
      
      const rect = dropZoneRef.current.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       rect.top < window.innerHeight && 
                       rect.bottom > 0;
      
      if (!isVisible) return;

      // Check if user is typing in a text input/textarea
      // Allow paste if drop zone is focused or if no text input is focused
      const activeElement = document.activeElement;
      const isTextInputFocused = activeElement?.tagName === 'INPUT' || 
                                activeElement?.tagName === 'TEXTAREA';
      const isDropZoneFocused = dropZoneRef.current?.contains(activeElement) || 
                               activeElement === dropZoneRef.current;
      
      // If a text input is focused and it's not part of this component, don't intercept paste
      if (isTextInputFocused && !isDropZoneFocused) {
        // Check if the focused input is the readonly URL display (which is part of this component)
        const urlInput = dropZoneRef.current?.querySelector('input[readonly]');
        if (activeElement !== urlInput) {
          return;
        }
      }

      const items = e.clipboardData?.items;
      if (!items) return;

      // Look for image in clipboard
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();
          const file = item.getAsFile();
          if (file) {
            uploadFile(file);
          }
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste, true); // Use capture phase for better interception
    return () => document.removeEventListener('paste', handlePaste, true);
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
            {/* Remove button - more prominent */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500/90 hover:bg-red-600 rounded-full transition-colors group shadow-lg z-10"
              title="Remove image (or paste a new one)"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Replace overlay on hover */}
            <div className="absolute inset-0 bg-depth-base/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <span className="text-text-primary font-medium">Click to replace or paste image</span>
              <span className="text-text-muted text-xs">(Ctrl+V / Cmd+V)</span>
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
                  Drop image here, paste (Ctrl+V / Cmd+V), or click to upload
                </p>
                <p className="text-text-muted text-sm">
                  JPEG, PNG, GIF, WebP, or SVG (max 50MB)
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
