/**
 * Admin Projects List Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import Button from '@/components/Button';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Project } from '@/types/database';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const { authFetch } = useAuthFetch();

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authFetch('/api/projects');
      const data = await response.json();
      setProjects(data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      setIsDeleting(true);
      const response = await authFetch(`/api/projects/${projectToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== projectToDelete.id));
        setDeleteModalOpen(false);
        setProjectToDelete(null);
      } else {
        console.error('Error deleting project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSortOrderChange = async (projectId: string, newSortOrder: number) => {
    try {
      setUpdatingOrderId(projectId);
      const response = await authFetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sort_order: newSortOrder }),
      });

      if (response.ok) {
        // Update local state and re-sort
        setProjects(prevProjects => {
          const updated = prevProjects.map(p =>
            p.id === projectId ? { ...p, sort_order: newSortOrder } : p
          );
          // Re-sort: by sort_order ascending, then title alphabetically for ties
          return updated.sort((a, b) => {
            if (a.sort_order !== b.sort_order) {
              return a.sort_order - b.sort_order;
            }
            return a.title.localeCompare(b.title);
          });
        });
      } else {
        console.error('Error updating sort order');
      }
    } catch (error) {
      console.error('Error updating sort order:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Calculate stats for indicators
  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.status === 'published').length,
    draft: projects.filter((p) => p.status === 'draft').length,
    featured: projects.filter((p) => p.featured).length,
    industries: new Set(projects.map((p) => p.industry).filter(Boolean)).size,
    tags: new Set(projects.flatMap((p) => p.tags || [])).size,
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Projects"
        subtitle="Manage your portfolio projects"
        actions={
          <Link href="/admin/projects/new">
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </Button>
          </Link>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Row - Grid layout matching leads/proposals style */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4 md:mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
              { label: 'Published', value: stats.published, color: 'text-green-400' },
              { label: 'Draft', value: stats.draft, color: 'text-amber-400' },
              { label: 'Featured', value: stats.featured, color: 'text-purple-400' },
              { label: 'Industries', value: stats.industries, color: 'text-blue-400' },
              { label: 'Tags', value: stats.tags, color: 'text-gray-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-depth-surface border border-depth-border rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 text-center"
              >
                <p className={`font-bold ${stat.color} text-lg md:text-2xl`}>
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-[10px] md:text-sm text-text-muted truncate">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Projects Table */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative z-10">
              <div className="p-6 border-b border-depth-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Database::Projects_Table
                  </span>
                </div>
              </div>
              {isLoading ? (
                <div className="p-6 text-center text-text-muted">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  No projects yet.{' '}
                  <Link href="/admin/projects/new" className="text-radiance-gold hover:underline">
                    Create your first project
                  </Link>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y divide-depth-border">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4">
                        {/* Header: Image + Title + Status */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-16 h-16 rounded-lg bg-depth-elevated flex-shrink-0 overflow-hidden">
                            {project.image_url ? (
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/admin/projects/${project.id}/edit`}
                              className="font-medium text-text-primary hover:text-radiance-gold transition-colors block break-words"
                              title={project.title}
                            >
                              {project.title.length > 100
                                ? `${project.title.slice(0, 100)}...`
                                : project.title}
                            </Link>
                            <p className="text-sm text-text-muted truncate">{project.industry || 'No industry'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  project.status === 'published'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-amber-500/10 text-amber-500'
                                }`}
                              >
                                {project.status}
                              </span>
                              {project.featured && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-radiance-gold/10 text-radiance-gold">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-depth-elevated text-text-muted text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-text-muted text-xs">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-text-muted">Order:</span>
                            <select
                              value={project.sort_order}
                              onChange={(e) => handleSortOrderChange(project.id, parseInt(e.target.value))}
                              disabled={updatingOrderId === project.id}
                              className={`w-14 px-1.5 py-1.5 bg-depth-elevated border border-depth-border rounded-lg text-xs text-center cursor-pointer hover:border-radiance-gold/50 focus:border-radiance-gold focus:outline-none transition-colors ${
                                updatingOrderId === project.id ? 'opacity-50 cursor-wait' : ''
                              }`}
                            >
                              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-depth-elevated hover:bg-depth-border text-text-secondary rounded-lg transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setProjectToDelete(project);
                              setDeleteModalOpen(true);
                            }}
                            className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-depth-elevated">
                        <tr>
                          <th className="px-4 py-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-20">
                            Order
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Tags
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-depth-border">
                        {projects.map((project) => (
                          <tr key={project.id} className="hover:bg-depth-elevated/50 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              <select
                                value={project.sort_order}
                                onChange={(e) => handleSortOrderChange(project.id, parseInt(e.target.value))}
                                disabled={updatingOrderId === project.id}
                                className={`w-16 px-2 py-1.5 bg-depth-elevated border border-depth-border rounded-lg text-sm text-center cursor-pointer hover:border-radiance-gold/50 focus:border-radiance-gold focus:outline-none focus:ring-1 focus:ring-radiance-gold/30 transition-colors ${
                                  updatingOrderId === project.id ? 'opacity-50 cursor-wait' : ''
                                }`}
                              >
                                {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-depth-elevated flex-shrink-0 overflow-hidden">
                                  {project.image_url ? (
                                    <img
                                      src={project.image_url}
                                      alt={project.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-text-primary">{project.title}</p>
                                  <p className="text-text-muted text-sm">{project.industry || 'No industry'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-text-secondary text-sm line-clamp-2 max-w-xs">
                                {project.description}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {project.tags?.slice(0, 3).map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-depth-elevated text-text-muted text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {project.tags && project.tags.length > 3 && (
                                  <span className="text-text-muted text-xs">
                                    +{project.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  project.status === 'published'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-amber-500/10 text-amber-500'
                                }`}
                              >
                                {project.status}
                              </span>
                              {project.featured && (
                                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-radiance-gold/10 text-radiance-gold">
                                  Featured
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/admin/projects/${project.id}/edit`}
                                  className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Link>
                                <button
                                  onClick={() => {
                                    setProjectToDelete(project);
                                    setDeleteModalOpen(true);
                                  }}
                                  className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>

            {/* Delete Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-depth-base/80 backdrop-blur-sm">
              <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Delete Project
              </h3>
              <p className="text-text-secondary mb-6">
                Are you sure you want to delete &quot;{projectToDelete?.title}&quot;? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setProjectToDelete(null);
                  }}
                >
                  Cancel
                </Button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
        </Container>
      </div>
    </div>
  );
}
