/**
 * Admin New Project Page (under Client)
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Client } from '@/types/clients';
import type { ClientProjectInsert } from '@/types/client-projects';

export default function AdminNewProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: clientId } = use(params);
  const router = useRouter();
  const { authFetch } = useAuthFetch();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ClientProjectInsert, 'client_id'>>({
    project_name: '',
    description: '',
    status: 'active',
    start_date: '',
    end_date: '',
  });

  const fetchClient = useCallback(async () => {
    try {
      const response = await authFetch(`/api/clients/${clientId}`);
      const data = await response.json();

      if (data.data) {
        setClient(data.data);
      } else {
        router.push('/admin/clients');
      }
    } catch (err) {
      console.error('Error fetching client:', err);
      router.push('/admin/clients');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, clientId, router]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authFetch(`/api/clients/${clientId}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        router.push(`/admin/clients/${clientId}`);
      } else {
        setError(data.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Project"
        subtitle={`Creating project for ${client.client_name}`}
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          <Link
            href={`/admin/clients/${clientId}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Client
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 md:p-8">
              {/* Client Info Banner */}
              <div className="mb-6 p-4 bg-depth-elevated rounded-lg flex items-center gap-3">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.client_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-radiance-gold/10 flex items-center justify-center">
                    <span className="text-radiance-gold font-semibold">
                      {client.client_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-text-primary font-medium">{client.client_name}</p>
                  <p className="text-sm text-text-muted">{client.client_company || client.client_email}</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="project_name"
                    value={formData.project_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                    placeholder="Website Redesign"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none resize-none"
                    placeholder="A brief description of the project..."
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date || ''}
                      onChange={handleChange}
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date || ''}
                      onChange={handleChange}
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push(`/admin/clients/${clientId}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}
