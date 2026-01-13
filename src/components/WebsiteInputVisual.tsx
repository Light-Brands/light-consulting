/**
 * Website Input Visual
 * Ultra-frictionless website URL input with inline contact form
 * Auto-proceeds when URL + name + email are ready
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Input } from './';
import { cn } from '../lib/utils';

interface WebsiteInputVisualProps {
  formData: {
    websiteUrl?: string;
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  errors: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
  onReady?: () => void;
}

export const WebsiteInputVisual: React.FC<WebsiteInputVisualProps> = ({
  formData,
  errors,
  onFieldChange,
  onReady,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [readinessChecked, setReadinessChecked] = useState(false);

  // Check readiness
  const isValidUrl = (url: string) => {
    if (!url.trim()) return false;
    try {
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      new URL(testUrl);
      return true;
    } catch {
      return false;
    }
  };

  const isUrlReady = isValidUrl(formData.websiteUrl || '');
  const isNameReady = !!formData.name?.trim();
  const isEmailReady = !!formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isAllReady = isUrlReady && isNameReady && isEmailReady;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-proceed when all fields are ready
  useEffect(() => {
    if (isAllReady && !readinessChecked && onReady) {
      setReadinessChecked(true);
      // Small delay for UX
      const timer = setTimeout(() => {
        onReady();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAllReady, readinessChecked, onReady]);

  const handleUrlChange = useCallback((value: string) => {
    onFieldChange('websiteUrl', value);
  }, [onFieldChange]);

  return (
    <div
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          AI Readiness Diagnostic
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Enter your website URL and we'll analyze your AI readiness, tech stack, and capacity gaps
        </p>
      </div>

      {/* Main Form */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Website URL Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Your Website URL <span className="text-radiance-gold">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="example.com or https://example.com"
              value={formData.websiteUrl || ''}
              onChange={(e) => handleUrlChange(e.target.value)}
              className={cn(
                'pl-12',
                errors.websiteUrl && 'border-error',
                isUrlReady && !errors.websiteUrl && 'border-radiance-gold/50'
              )}
            />
          </div>
          {errors.websiteUrl && (
            <p className="mt-1 text-sm text-error">{errors.websiteUrl}</p>
          )}
          {isUrlReady && !errors.websiteUrl && (
            <p className="mt-1 text-sm text-radiance-gold">✓ Valid URL</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="pt-6 border-t border-depth-border">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Name <span className="text-radiance-gold">*</span>
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={formData.name || ''}
                onChange={(e) => onFieldChange('name', e.target.value)}
                className={cn(
                  errors.name && 'border-error',
                  isNameReady && !errors.name && 'border-radiance-gold/50'
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email <span className="text-radiance-gold">*</span>
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email || ''}
                onChange={(e) => onFieldChange('email', e.target.value)}
                className={cn(
                  errors.email && 'border-error',
                  isEmailReady && !errors.email && 'border-radiance-gold/50'
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company (Optional)
              </label>
              <Input
                type="text"
                placeholder="Company name"
                value={formData.company || ''}
                onChange={(e) => onFieldChange('company', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone (Optional)
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => onFieldChange('phone', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Readiness Indicator */}
        {isAllReady && (
          <div className="mt-6 p-4 bg-radiance-gold/10 border border-radiance-gold/30 rounded-lg">
            <div className="flex items-center gap-2 text-radiance-gold">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">All set! Analyzing your website...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
