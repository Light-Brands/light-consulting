/**
 * Admin Dashboard Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Project } from '@/types/database';

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  featuredProjects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    featuredProjects: 0,
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAuthFetch();

  const fetchData = useCallback(async () => {
    try {
      const response = await authFetch('/api/projects');
      const data = await response.json();

      if (data.data) {
        const projects = data.data as Project[];
        setStats({
          totalProjects: projects.length,
          publishedProjects: projects.filter((p) => p.status === 'published').length,
          draftProjects: projects.filter((p) => p.status === 'draft').length,
          featuredProjects: projects.filter((p) => p.featured).length,
        });
        setRecentProjects(projects.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'radiance-gold',
    },
    {
      label: 'Published',
      value: stats.publishedProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green-500',
    },
    {
      label: 'Drafts',
      value: stats.draftProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'amber-500',
    },
    {
      label: 'Featured',
      value: stats.featuredProjects,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome to Light Brand Consulting Admin"
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />
        
        <Container size="wide" className="relative z-10">
          {/* Mobile Quick Actions - Only visible on mobile */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-4 bg-depth-surface border border-depth-border rounded-xl hover:border-radiance-gold/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">Leads</p>
                <p className="text-xs text-text-muted">View all leads</p>
              </div>
            </Link>
            <Link
              href="/admin/proposals"
              className="flex items-center gap-3 p-4 bg-depth-surface border border-depth-border rounded-xl hover:border-radiance-gold/30 transition-colors"
            >
              <div className="p-2 rounded-lg bg-wisdom-violet/10 text-wisdom-violet">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">Proposals</p>
                <p className="text-xs text-text-muted">View all proposals</p>
              </div>
            </Link>
          </div>

          {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-depth-surface border border-depth-border rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden group hover:border-radiance-gold/30 transition-all duration-500"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-lg bg-${stat.color}/10 text-${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-4 h-4 md:w-6 md:h-6 [&>svg]:w-full [&>svg]:h-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="hidden md:block text-[8px] font-mono text-text-muted uppercase tracking-wider">
                    {stat.label.toUpperCase().replace(' ', '_')}
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-text-primary mb-0.5 md:mb-1 group-hover:text-radiance-gold transition-colors">
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-text-muted text-xs md:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
          </div>

          {/* Recent Projects */}
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
              <div className="p-6 border-b border-depth-border flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                      Portfolio::Recent_Projects
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Recent Projects
                  </h2>
                </div>
            <Link
              href="/admin/projects"
              className="text-radiance-gold text-sm hover:text-radiance-amber transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-depth-border">
            {isLoading ? (
              <div className="p-6 text-center text-text-muted">Loading...</div>
            ) : recentProjects.length === 0 ? (
              <div className="p-6 text-center text-text-muted">
                No projects yet.{' '}
                <Link
                  href="/admin/projects/new"
                  className="text-radiance-gold hover:underline"
                >
                  Create your first project
                </Link>
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 flex items-center justify-between hover:bg-depth-elevated transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-depth-elevated flex items-center justify-center">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <svg
                          className="w-6 h-6 text-text-muted"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <p className="font-medium text-text-primary break-words">
                        {project.title.length > 100
                          ? `${project.title.slice(0, 100)}...`
                          : project.title}
                      </p>
                      <p className="text-sm text-text-muted">
                        {project.industry || 'No industry'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'published'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}
                    >
                      {project.status}
                    </span>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-text-muted hover:text-text-primary transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/projects/new"
              className="relative p-6 bg-depth-surface border border-depth-border rounded-2xl hover:border-radiance-gold/30 transition-all group overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="p-4 rounded-xl bg-radiance-gold/10 text-radiance-gold group-hover:bg-radiance-gold group-hover:text-depth-base transition-all group-hover:scale-110 group-hover:shadow-illumination">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">ACTION</span>
                  </div>
                  <p className="font-semibold text-text-primary group-hover:text-radiance-gold transition-colors">Add New Project</p>
                  <p className="text-sm text-text-muted">Create a new portfolio project</p>
                </div>
              </div>
            </Link>
            <Link
              href="/portfolio"
              target="_blank"
              className="relative p-6 bg-depth-surface border border-depth-border rounded-2xl hover:border-radiance-gold/30 transition-all group overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-radial-gradient from-wisdom-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="p-4 rounded-xl bg-wisdom-violet/10 text-wisdom-violet group-hover:bg-wisdom-violet group-hover:text-white transition-all group-hover:scale-110 group-hover:shadow-illumination">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">EXTERNAL</span>
                  </div>
                  <p className="font-semibold text-text-primary group-hover:text-wisdom-violet transition-colors">View Portfolio</p>
                  <p className="text-sm text-text-muted">Open the public portfolio page</p>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
