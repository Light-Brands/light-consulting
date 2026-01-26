/**
 * Client Portal Projects List Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import { ProjectProgressBar } from '@/components/client-portal';
import type { ClientProject } from '@/types/client-portal';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function ProjectsListContent() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = new URLSearchParams();
        if (token) params.set('token', token);

        const response = await fetch(`/api/client-portal/projects?${params.toString()}`);
        const data = await response.json();

        if (data.data) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'active') return p.status === 'active';
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Your Projects
            </h1>
            <p className="text-text-muted">
              View and track all your projects with Light Brand
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === f
                    ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/30'
                    : 'bg-depth-surface border border-depth-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-depth-surface border border-depth-border rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-depth-elevated rounded w-2/3 mb-3" />
                <div className="h-4 bg-depth-elevated rounded w-1/3 mb-4" />
                <div className="h-3 bg-depth-elevated rounded w-full mb-2" />
                <div className="h-3 bg-depth-elevated rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-depth-surface border border-depth-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-depth-elevated flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No projects found
            </h3>
            <p className="text-text-muted">
              {filter !== 'all'
                ? `No ${filter} projects to display. Try changing the filter.`
                : 'Contact your project manager if you believe this is an error.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/client-portal/projects/${project.id}${token ? `?token=${token}` : ''}`}
                className="bg-depth-surface border border-depth-border rounded-2xl p-6 hover:border-radiance-gold/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary truncate group-hover:text-radiance-gold transition-colors">
                      {project.project_name}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {project.client_company || project.client_name}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full flex-shrink-0 ${
                      project.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : project.status === 'completed'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                <ProjectProgressBar
                  progress={project.progress_percentage}
                  size="sm"
                  className="mb-4"
                />

                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  {project.current_phase && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {project.current_phase}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {project.phases_completed}/{project.phases_total} phases
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-depth-border">
                  <div className="text-sm">
                    <span className="text-text-muted">Paid: </span>
                    <span className="text-green-400 font-medium">
                      {formatCurrency(project.total_paid)}
                    </span>
                  </div>
                  {project.total_due > 0 && (
                    <div className="text-sm">
                      <span className="text-text-muted">Due: </span>
                      <span className="text-amber-400 font-medium">
                        {formatCurrency(project.total_due)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ClientProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 md:py-12">
          <Container size="wide">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-depth-elevated rounded w-1/3" />
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-depth-surface border border-depth-border rounded-2xl p-6"
                  >
                    <div className="h-6 bg-depth-elevated rounded w-2/3 mb-3" />
                    <div className="h-4 bg-depth-elevated rounded w-1/3 mb-4" />
                    <div className="h-3 bg-depth-elevated rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      }
    >
      <ProjectsListContent />
    </Suspense>
  );
}
