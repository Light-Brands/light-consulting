/**
 * Document Upload Visual
 * CONCEPT: "The First Step"
 * Ultra-frictionless document upload with inline contact form
 * Auto-proceeds when file + name + email are ready
 */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from './';
import { cn } from '../lib/utils';

interface DocumentUploadVisualProps {
  formData: {
    document: File | null;
    name?: string;
    email?: string;
    company?: string;
  };
  errors: Record<string, string>;
  onDocumentChange: (file: File | null) => void;
  onFieldChange: (field: string, value: string) => void;
  onReady?: () => void;
}

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
  'text/markdown',
];

const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.txt', '.md'];
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) {
    return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
        <path d="M8 12h8v2H8zm0 4h5v2H8z" />
      </svg>
    );
  }
  if (type.includes('word') || type.includes('document')) {
    return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
        <path d="M8 13l2 4 2-4 2 4h1v-2l-2-4 2-4h-1l-2 4-2-4-2 4v2h1z" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
    </svg>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const DocumentUploadVisual: React.FC<DocumentUploadVisualProps> = ({
  formData,
  errors,
  onDocumentChange,
  onFieldChange,
  onReady,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [readinessChecked, setReadinessChecked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check readiness
  const isDocumentReady = !!formData.document;
  const isNameReady = !!formData.name?.trim();
  const isEmailReady = !!formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isAllReady = isDocumentReady && isNameReady && isEmailReady;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-proceed when all fields are ready
  useEffect(() => {
    if (isAllReady && !readinessChecked && onReady) {
      setReadinessChecked(true);
      // Small delay to let user see the checkmarks
      const timer = setTimeout(() => {
        onReady();
      }, 800);
      return () => clearTimeout(timer);
    }
    if (!isAllReady) {
      setReadinessChecked(false);
    }
  }, [isAllReady, readinessChecked, onReady]);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type) && !ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
      return 'Please upload a PDF, DOCX, DOC, TXT, or MD file';
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be under ${formatFileSize(MAX_FILE_SIZE)}`;
    }
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      onFieldChange('documentError', error);
      return;
    }
    onDocumentChange(file);
    onFieldChange('documentError', '');
  }, [onDocumentChange, onFieldChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemoveFile = useCallback(() => {
    onDocumentChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onDocumentChange]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'transition-all duration-1000',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Upload Your Business Document
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto mb-3">
          Share the document that best explains your business
        </p>
        <p className="text-text-muted text-sm">
          Business plan &bull; Pitch deck &bull; Company overview &bull; Strategy document
        </p>
      </div>

      {/* Upload Area */}
      <div className="relative group mb-8">
        <div
          className={cn(
            'relative z-10 bg-depth-elevated/20 border-2 border-dashed rounded-2xl p-8 md:p-12 backdrop-blur-sm transition-all duration-300',
            isDragging
              ? 'border-radiance-gold bg-radiance-gold/5 scale-[1.02]'
              : formData.document
              ? 'border-success/50 bg-success/5'
              : 'border-depth-border hover:border-radiance-gold/40 hover:bg-depth-elevated/30',
            errors.document && 'border-error bg-error/5'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {!formData.document ? (
            <div className="text-center">
              {/* Upload Icon */}
              <div className={cn(
                'w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-300',
                isDragging
                  ? 'bg-radiance-gold/20 text-radiance-gold scale-110'
                  : 'bg-depth-surface text-text-muted'
              )}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {isDragging ? 'Drop your document here' : 'Drag & drop your document'}
              </h3>
              <p className="text-text-muted mb-6">
                or click to browse your files
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(',')}
                onChange={handleFileInput}
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="inline-flex items-center px-6 py-3 bg-radiance-gold/10 hover:bg-radiance-gold/20 border border-radiance-gold/30 hover:border-radiance-gold/50 rounded-lg text-radiance-gold font-medium cursor-pointer transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Document
              </label>

              <p className="text-xs text-text-muted mt-6">
                PDF, DOCX, DOC, TXT, or MD &bull; Max {formatFileSize(MAX_FILE_SIZE)}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* File Preview */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-success/20 text-success flex items-center justify-center">
                  {getFileIcon(formData.document.type)}
                </div>
                <div>
                  <p className="font-medium text-text-primary truncate max-w-[200px] md:max-w-[400px]">
                    {formData.document.name}
                  </p>
                  <p className="text-sm text-text-muted">
                    {formatFileSize(formData.document.size)}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={handleRemoveFile}
                className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
                aria-label="Remove file"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Glow Effect */}
          {isDragging && (
            <div className="absolute -inset-1 bg-radiance-gold/20 blur-xl rounded-2xl -z-10 animate-pulse" />
          )}
        </div>

        {errors.document && (
          <p className="mt-2 text-sm text-error font-medium">{errors.document}</p>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-center text-sm text-text-muted mb-10">
        The more comprehensive, the better we can understand your business and create personalized value
      </p>

      {/* Contact Form - Inline */}
      <div className="relative group">
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-8 md:p-10 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/20">
          <div className="space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  label="Full Name"
                  placeholder="Your name"
                  value={formData.name || ''}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                  error={errors.name}
                  required
                />
                {isNameReady && (
                  <div className="absolute top-0 right-0 mt-1 text-success">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email || ''}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
                {isEmailReady && (
                  <div className="absolute top-0 right-0 mt-1 text-success">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Field */}
            <div>
              <Input
                label="Company Name"
                placeholder="Your company or organization (optional)"
                value={formData.company || ''}
                onChange={(e) => onFieldChange('company', e.target.value)}
                hint="Can be inferred from your document"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Readiness Indicator */}
      <div className="mt-8 flex items-center justify-center gap-6 text-sm">
        <div className={cn(
          'flex items-center gap-2 transition-all duration-300',
          isDocumentReady ? 'text-success' : 'text-text-muted'
        )}>
          <div className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300',
            isDocumentReady ? 'bg-success/20' : 'bg-depth-surface'
          )}>
            {isDocumentReady ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-xs">1</span>
            )}
          </div>
          <span>Document</span>
        </div>

        <div className={cn(
          'flex items-center gap-2 transition-all duration-300',
          isNameReady ? 'text-success' : 'text-text-muted'
        )}>
          <div className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300',
            isNameReady ? 'bg-success/20' : 'bg-depth-surface'
          )}>
            {isNameReady ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-xs">2</span>
            )}
          </div>
          <span>Name</span>
        </div>

        <div className={cn(
          'flex items-center gap-2 transition-all duration-300',
          isEmailReady ? 'text-success' : 'text-text-muted'
        )}>
          <div className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300',
            isEmailReady ? 'bg-success/20' : 'bg-depth-surface'
          )}>
            {isEmailReady ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-xs">3</span>
            )}
          </div>
          <span>Email</span>
        </div>
      </div>

      {isAllReady && (
        <p className="text-center text-sm text-radiance-gold mt-4 animate-pulse">
          Starting AI analysis...
        </p>
      )}
    </div>
  );
};

export default DocumentUploadVisual;
