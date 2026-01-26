/**
 * Client Portal Project Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import {
  ProjectProgressBar,
  PhaseAccordion,
  DeliverableCard,
  MilestonePaymentCard,
  ActivityFeed,
} from '@/components/client-portal';
import type { ClientProjectDetail } from '@/types/client-portal';

interface Props {
  params: Promise<{ id: string }>;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ClientProjectDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<ClientProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'deliverables' | 'payments'>('overview');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (token) queryParams.set('token', token);

        const response = await fetch(
          `/api/client-portal/projects/${resolvedParams.id}?${queryParams.toString()}`
        );
        const data = await response.json();

        if (data.data) {
          setProject(data.data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [resolvedParams.id, token]);

  const handlePayClick = (milestoneId: string, paymentUrl: string) => {
    window.open(paymentUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-depth-elevated rounded w-1/3" />
            <div className="h-4 bg-depth-elevated rounded w-1/4" />
            <div className="h-32 bg-depth-elevated rounded" />
          </div>
        </Container>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Project Not Found
            </h1>
            <p className="text-text-muted">
              This project may not exist or you may not have access to it.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'phases', label: 'Phases' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'payments', label: 'Payments' },
  ];

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            {project.project_name}
          </h1>
          <p className="text-text-muted">
            {project.client_company || project.client_name}
          </p>
        </div>

        {/* Progress & Stats */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 mb-6">
          <ProjectProgressBar progress={project.progress_percentage} size="lg" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <p className="text-sm text-text-muted mb-1">Status</p>
              <p className="font-semibold text-text-primary capitalize">
                {project.status.replace('_', ' ')}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Total Value</p>
              <p className="font-semibold text-text-primary">
                {formatCurrency(project.final_amount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Paid</p>
              <p className="font-semibold text-green-400">
                {formatCurrency(project.total_paid)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Remaining</p>
              <p className="font-semibold text-amber-400">
                {formatCurrency(project.total_pending)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/30'
                  : 'bg-depth-surface border border-depth-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6">
              {project.project_overview && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Project Overview
                  </h3>
                  <p className="text-text-secondary">{project.project_overview}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    {project.start_date && (
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Start:</span>{' '}
                        {new Date(project.start_date).toLocaleDateString()}
                      </p>
                    )}
                    {project.estimated_completion_date && (
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Est. Completion:</span>{' '}
                        {new Date(project.estimated_completion_date).toLocaleDateString()}
                      </p>
                    )}
                    {project.total_timeline && (
                      <p className="text-text-secondary">
                        <span className="text-text-muted">Duration:</span>{' '}
                        {project.total_timeline}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    Recent Activity
                  </h3>
                  <ActivityFeed activities={project.recent_activity.slice(0, 5)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phases' && (
            <div className="p-6">
              <PhaseAccordion phases={project.phases} />
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="p-6">
              {project.deliverable_links.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  No deliverables available yet
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {project.deliverable_links.map((link) => (
                    <DeliverableCard key={link.id} link={link} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="p-6">
              {project.milestones.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  No payment milestones defined
                </div>
              ) : (
                <div className="space-y-4">
                  {project.milestones.map((milestone) => (
                    <MilestonePaymentCard
                      key={milestone.id}
                      milestone={milestone}
                      onPayClick={handlePayClick}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
