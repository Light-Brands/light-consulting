'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import { DocumentsTab, ComingSoonCard } from '@/components/admin/planning';
import { PLANNING_BRANDS, PLANNING_BRAND_COUNT, PLANNING_DOC_COUNT } from '@/data/planning-docs';

type Tab = 'documents' | 'project-planner' | 'brand-planner';

const tabs: { id: Tab; label: string }[] = [
  { id: 'documents', label: 'Documents' },
  { id: 'project-planner', label: 'Project Planner' },
  { id: 'brand-planner', label: 'Brand Planner' },
];

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState<Tab>('documents');

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Planning"
        subtitle={`${PLANNING_BRAND_COUNT} brands · ${PLANNING_DOC_COUNT} documents`}
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Tab bar */}
          <div className="flex gap-1 p-1 bg-depth-surface border border-depth-border rounded-xl mb-6 w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/20'
                    : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'documents' && (
            <DocumentsTab brands={PLANNING_BRANDS} />
          )}
          {activeTab === 'project-planner' && (
            <ComingSoonCard
              title="Project Planner"
              description="Plan and track brand projects with timelines, milestones, and resource allocation across your portfolio."
            />
          )}
          {activeTab === 'brand-planner' && (
            <ComingSoonCard
              title="Brand Planner"
              description="Strategic brand planning with identity frameworks, market positioning, and launch roadmaps."
            />
          )}
        </Container>
      </div>
    </div>
  );
}
