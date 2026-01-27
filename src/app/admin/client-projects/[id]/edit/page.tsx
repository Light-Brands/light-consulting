/**
 * Admin Edit Client Project Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ClientProject, ClientProjectUpdate } from '@/types/client-projects';

export default function AdminEditClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { authFetch } = useAuthFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const [formData, setFormData] = useState<ClientProjectUpdate>({
    project_name: '',
    description: '',
    status: 'active',
    start_date: '',
    end_date: '',
  });

  const fetchProject = useCallback(async () => {
    try {
      const response = await authFetch(`/api/client-projects/${id}`);
      const data = await response.json();

      if (data.data) {
        const project = data.data as ClientProject;
        setClientId(project.client_id);
        setFormData({
          project_name: project.project_name,
          description: project.description || '',
          status: project.status,
          start_date: project.start_date || '',
          end_date: project.end_date || '',
        });
      } else {
        router.push('/admin/clients');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      router.push('/admin/clients');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authFetch(`/api/client-projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.data) {
        router.push(`/admin/client-projects/${id}`);
      } else {
        setError(data.error || 'Failed to update project');
      }
    } catch (err) {
      console.error('Error updating project:', err);
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

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Edit Project"
        subtitle="Update project information"
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          <Link
            href={`/admin/client-projects/${id}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Project
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 md:p-8">
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
                    value={formData.project_name || ''}
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
                  onClick={() => router.push(`/admin/client-projects/${id}`)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}
