/**
 * Admin New Client Project Page
 * Light Brand Consulting
 *
 * Standalone page to create a new project with client selection
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Client } from '@/types/clients';
import type { ClientProjectInsert } from '@/types/client-projects';

export default function AdminNewClientProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authFetch } = useAuthFetch();

  const [clients, setClients] = useState<Client[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get pre-selected client from URL if provided
  const preSelectedClientId = searchParams.get('client_id');

  const [formData, setFormData] = useState<ClientProjectInsert>({
    client_id: preSelectedClientId || '',
    project_name: '',
    description: '',
    status: 'active',
    start_date: '',
    end_date: '',
  });

  const fetchClients = useCallback(async () => {
    try {
      const response = await authFetch('/api/clients?status=active');
      const data = await response.json();

      if (data.data) {
        setClients(data.data);
        // If we have a pre-selected client, verify it exists
        if (preSelectedClientId && !data.data.find((c: Client) => c.id === preSelectedClientId)) {
          setFormData(prev => ({ ...prev, client_id: '' }));
        }
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setIsLoadingClients(false);
    }
  }, [authFetch, preSelectedClientId]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.client_id) {
      setError('Please select a client');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authFetch(`/api/clients/${formData.client_id}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_name: formData.project_name,
          description: formData.description,
          status: formData.status,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        router.push(`/admin/client-projects/${data.data.id}`);
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

  const selectedClient = clients.find(c => c.id === formData.client_id);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Project"
        subtitle="Create a new client project"
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          <Link
            href="/admin/client-projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 md:p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Client *
                  </label>
                  {isLoadingClients ? (
                    <div className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-muted">
                      Loading clients...
                    </div>
                  ) : clients.length === 0 ? (
                    <div className="p-4 bg-depth-elevated rounded-lg text-center">
                      <p className="text-text-muted mb-2">No clients found.</p>
                      <Link href="/admin/clients/new" className="text-radiance-gold hover:underline text-sm">
                        Create a client first
                      </Link>
                    </div>
                  ) : (
                    <>
                      <select
                        name="client_id"
                        value={formData.client_id}
                        onChange={handleChange}
                        required
                        className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                      >
                        <option value="">Select a client...</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.client_name}
                            {client.client_company && ` (${client.client_company})`}
                          </option>
                        ))}
                      </select>

                      {/* Selected Client Info */}
                      {selectedClient && (
                        <div className="mt-3 p-3 bg-depth-elevated rounded-lg flex items-center gap-3">
                          {selectedClient.logo_url ? (
                            <img
                              src={selectedClient.logo_url}
                              alt={selectedClient.client_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-radiance-gold/10 flex items-center justify-center">
                              <span className="text-radiance-gold font-semibold text-sm">
                                {selectedClient.client_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-text-primary text-sm font-medium truncate">{selectedClient.client_name}</p>
                            <p className="text-xs text-text-muted truncate">{selectedClient.client_email}</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

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
                  onClick={() => router.push('/admin/client-projects')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || clients.length === 0}
                >
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
