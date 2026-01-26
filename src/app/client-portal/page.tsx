/**
 * Client Portal Dashboard Page
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

function ClientPortalContent() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const totalInvested = projects.reduce((sum, p) => sum + p.total_paid, 0);
  const totalPending = projects.reduce((sum, p) => sum + p.total_due, 0);
  const activeProjects = projects.filter((p) => p.status === 'active');

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Welcome back
          </h1>
          <p className="text-text-muted">
            Track your project progress and manage payments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Projects', value: activeProjects.length, color: 'text-radiance-gold' },
            { label: 'Total Projects', value: projects.length, color: 'text-text-primary' },
            { label: 'Total Invested', value: formatCurrency(totalInvested), color: 'text-green-400' },
            { label: 'Pending Payments', value: formatCurrency(totalPending), color: 'text-amber-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-depth-surface border border-depth-border rounded-xl p-4"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>
                {isLoading ? '-' : stat.value}
              </p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Projects List */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-depth-border">
            <h2 className="text-lg font-semibold text-text-primary">
              Your Projects
            </h2>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-5 bg-depth-elevated rounded w-1/3 mb-3" />
                  <div className="h-3 bg-depth-elevated rounded w-full mb-2" />
                  <div className="h-3 bg-depth-elevated rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-text-muted">
              No projects found. Contact your project manager if you believe this is an error.
            </div>
          ) : (
            <div className="divide-y divide-depth-border">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/client-portal/projects/${project.id}${token ? `?token=${token}` : ''}`}
                  className="block p-4 md:p-6 hover:bg-depth-elevated transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary truncate">
                        {project.project_name}
                      </h3>
                      <p className="text-sm text-text-muted">
                        {project.client_company || project.client_name}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
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
                    {project.total_due > 0 && (
                      <span className="flex items-center gap-1 text-amber-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatCurrency(project.total_due)} due
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default function ClientPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 md:py-12">
          <Container size="wide">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-depth-elevated rounded w-1/3" />
              <div className="h-4 bg-depth-elevated rounded w-1/4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-depth-elevated rounded-xl" />
                ))}
              </div>
            </div>
          </Container>
        </div>
      }
    >
      <ClientPortalContent />
    </Suspense>
  );
}
