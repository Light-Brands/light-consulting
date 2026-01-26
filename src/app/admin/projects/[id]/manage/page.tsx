/**
 * Project Management Page
 * Light Brand Consulting
 *
 * Kanban/List view for managing project deliverables
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import {
  FilterBar,
  ListView,
  KanbanBoard,
  DeliverableModal,
  ViewMode,
} from '@/components/admin/project-manage';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type {
  DeliverableWithAssignee,
  DeliverableStatus,
  DeliverablePriority,
  DeliverableInsert,
  DeliverableUpdate,
} from '@/types/deliverables';

interface Phase {
  id: string;
  phase_name: string;
  phase_number: number;
}

interface Milestone {
  id: string;
  milestone_name: string;
}

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface Proposal {
  id: string;
  project_name: string;
  client_name: string;
  status: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectManagePage({ params }: PageProps) {
  const { id } = use(params);
  const { authFetch } = useAuthFetch();

  // Data state
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [deliverables, setDeliverables] = useState<DeliverableWithAssignee[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliverableStatus | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeliverable, setEditingDeliverable] = useState<DeliverableWithAssignee | null>(null);

  // Migration state
  const [needsMigration, setNeedsMigration] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  // Fetch proposal and phases
  const fetchProposal = useCallback(async () => {
    try {
      const response = await authFetch(`/api/proposals/${id}`);
      const data = await response.json();
      if (data.data) {
        setProposal({
          id: data.data.id,
          project_name: data.data.project_name,
          client_name: data.data.client_name,
          status: data.data.status,
        });
        setPhases(
          data.data.phases?.map((p: Phase & { phase_number: number }) => ({
            id: p.id,
            phase_name: p.phase_name,
            phase_number: p.phase_number,
          })) || []
        );
        setMilestones(
          data.data.milestones?.map((m: Milestone) => ({
            id: m.id,
            milestone_name: m.milestone_name,
          })) || []
        );
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    }
  }, [authFetch, id]);

  // Fetch deliverables
  const fetchDeliverables = useCallback(async () => {
    try {
      const response = await authFetch(
        `/api/admin/deliverables?proposal_id=${id}&include_completed=true`
      );
      const data = await response.json();
      if (data.data) {
        setDeliverables(data.data);
      }
    } catch (error) {
      console.error('Error fetching deliverables:', error);
    }
  }, [authFetch, id]);

  // Fetch team members
  const fetchTeam = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/team');
      const data = await response.json();
      if (data.data) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }, [authFetch]);

  // Check migration status
  const checkMigration = useCallback(async () => {
    try {
      const response = await authFetch(
        `/api/admin/deliverables/migrate?proposal_id=${id}`
      );
      const data = await response.json();
      if (data.data?.needs_migration) {
        setNeedsMigration(true);
      }
    } catch (error) {
      console.error('Error checking migration:', error);
    }
  }, [authFetch, id]);

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchProposal(), fetchDeliverables(), fetchTeam(), checkMigration()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchProposal, fetchDeliverables, fetchTeam, checkMigration]);

  // Handle migration
  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      const response = await authFetch('/api/admin/deliverables/migrate', {
        method: 'POST',
        body: JSON.stringify({ proposal_id: id }),
      });
      const data = await response.json();
      if (data.data) {
        await fetchDeliverables();
        setNeedsMigration(false);
      }
    } catch (error) {
      console.error('Error migrating deliverables:', error);
    } finally {
      setIsMigrating(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (id: string, status: DeliverableStatus) => {
    // Optimistic update
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );

    try {
      await authFetch(`/api/admin/deliverables/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert on error
      await fetchDeliverables();
    }
  };

  // Handle assignee change
  const handleAssigneeChange = async (id: string, assigneeId: string | null) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, assigned_to: assigneeId } : d))
    );

    try {
      await authFetch(`/api/admin/deliverables/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ assigned_to: assigneeId }),
      });
    } catch (error) {
      console.error('Error updating assignee:', error);
      await fetchDeliverables();
    }
  };

  // Handle priority change
  const handlePriorityChange = async (id: string, priority: DeliverablePriority) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, priority } : d))
    );

    try {
      await authFetch(`/api/admin/deliverables/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ priority }),
      });
    } catch (error) {
      console.error('Error updating priority:', error);
      await fetchDeliverables();
    }
  };

  // Handle save (create/update)
  const handleSaveDeliverable = async (
    data: DeliverableInsert | DeliverableUpdate,
    id?: string
  ) => {
    if (id) {
      // Update
      await authFetch(`/api/admin/deliverables/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } else {
      // Create
      await authFetch('/api/admin/deliverables', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
    await fetchDeliverables();
  };

  // Handle delete
  const handleDeleteDeliverable = async (id: string) => {
    await authFetch(`/api/admin/deliverables/${id}`, {
      method: 'DELETE',
    });
    await fetchDeliverables();
  };

  // Handle deliverable click (open modal)
  const handleDeliverableClick = (deliverable: DeliverableWithAssignee) => {
    setEditingDeliverable(deliverable);
    setIsModalOpen(true);
  };

  // Filter deliverables
  const filteredDeliverables = deliverables.filter((d) => {
    if (selectedPhaseId && d.phase_id !== selectedPhaseId) return false;
    if (selectedStatus && d.status !== selectedStatus) return false;
    if (selectedAssignee && d.assigned_to !== selectedAssignee) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !d.name.toLowerCase().includes(query) &&
        !(d.description?.toLowerCase().includes(query))
      ) {
        return false;
      }
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Loading..." subtitle="Please wait" />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading project...</div>
        </Container>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Project Not Found" subtitle="The requested project could not be found" />
        <Container size="wide" className="py-12">
          <Link href="/admin/proposals" className="text-radiance-gold hover:text-radiance-amber">
            Back to Proposals
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={proposal.project_name}
        subtitle={`Deliverables for ${proposal.client_name}`}
        action={
          <Button
            variant="primary"
            onClick={() => {
              setEditingDeliverable(null);
              setIsModalOpen(true);
            }}
            className="text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Deliverable
          </Button>
        }
      />

      <div className="py-4 sm:py-8">
        <Container size="wide">
          {/* Back Link */}
          <Link
            href={`/admin/proposals/${id}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-4 sm:mb-6 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Proposal
          </Link>

          {/* Migration Prompt */}
          {needsMigration && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Deliverables available for import
                  </p>
                  <p className="text-xs text-text-muted">
                    Phase definitions include deliverables that can be imported as trackable items
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleMigrate}
                disabled={isMigrating}
                className="text-sm"
              >
                {isMigrating ? 'Importing...' : 'Import Deliverables'}
              </Button>
            </div>
          )}

          {/* Filter Bar */}
          <div className="mb-6">
            <FilterBar
              phases={phases}
              teamMembers={teamMembers}
              selectedPhaseId={selectedPhaseId}
              selectedStatus={selectedStatus}
              selectedAssignee={selectedAssignee}
              searchQuery={searchQuery}
              viewMode={viewMode}
              onPhaseChange={setSelectedPhaseId}
              onStatusChange={setSelectedStatus}
              onAssigneeChange={setSelectedAssignee}
              onSearchChange={setSearchQuery}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* View Content */}
          {viewMode === 'kanban' ? (
            <KanbanBoard
              deliverables={filteredDeliverables}
              onStatusChange={handleStatusChange}
              onDeliverableClick={handleDeliverableClick}
            />
          ) : (
            <ListView
              deliverables={filteredDeliverables}
              phases={phases}
              teamMembers={teamMembers}
              groupByPhase={!!selectedPhaseId === false}
              onStatusChange={handleStatusChange}
              onAssigneeChange={handleAssigneeChange}
              onPriorityChange={handlePriorityChange}
              onDeliverableClick={handleDeliverableClick}
            />
          )}
        </Container>
      </div>

      {/* Deliverable Modal */}
      <DeliverableModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDeliverable(null);
        }}
        deliverable={editingDeliverable}
        id={id}
        phases={phases}
        milestones={milestones}
        teamMembers={teamMembers}
        onSave={handleSaveDeliverable}
        onDelete={handleDeleteDeliverable}
      />
    </div>
  );
}
