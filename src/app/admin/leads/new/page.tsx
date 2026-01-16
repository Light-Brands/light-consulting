/**
 * Admin New Lead Page
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import Button from '@/components/Button';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { LeadSubmissionInsert, LeadStatus } from '@/types/proposals';

const SERVICE_OPTIONS = [
  { value: 'diagnostic', label: 'Diagnostic' },
  { value: 'command-center', label: 'Command Center' },
  { value: 'authority-engine', label: 'Authority Engine' },
  { value: 'ascension', label: 'Ascension' },
];

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'converted', label: 'Converted' },
  { value: 'archived', label: 'Archived' },
];

interface LeadFormData {
  service: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  website_url: string;
  notes: string;
  status: LeadStatus;
}

export default function NewLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authFetch } = useAuthFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: {
      service: 'diagnostic',
      name: '',
      email: '',
      company: '',
      phone: '',
      website_url: '',
      notes: '',
      status: 'new',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const leadData: LeadSubmissionInsert = {
        service: data.service,
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        website_url: data.website_url || null,
        notes: data.notes || null,
        status: data.status,
      };

      const response = await authFetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to create lead');
      }

      router.push('/admin/leads');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Lead"
        subtitle="Manually add a new lead submission"
      />

      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="max-w-2xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="Enter contact name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      {...register('company')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="Company name"
                    />
                  </div>

                  {/* Website URL */}
                  <div>
                    <label htmlFor="website_url" className="block text-sm font-medium text-text-primary mb-2">
                      Website URL
                    </label>
                    <input
                      id="website_url"
                      type="url"
                      {...register('website_url')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Lead Details
                </h2>

                <div className="space-y-6">
                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-text-primary mb-2">
                      Service Interest *
                    </label>
                    <select
                      id="service"
                      {...register('service', { required: 'Service is required' })}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-2 text-sm text-red-400">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      {...register('status')}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      {...register('notes')}
                      rows={4}
                      className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold focus:border-transparent resize-none"
                      placeholder="Add any notes about this lead..."
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push('/admin/leads')}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Create Lead
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
