/**
 * Filter Bar Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { StatusSelector } from './StatusSelector';
import { UserAssignmentDropdown } from './UserAssignmentDropdown';
import { ViewToggle, ViewMode } from './ViewToggle';
import type { DeliverableStatus } from '@/types/deliverables';

interface Phase {
  id: string;
  phase_name: string;
  phase_number: number;
}

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface FilterBarProps {
  phases: Phase[];
  teamMembers: TeamMember[];
  selectedPhaseId: string | null;
  selectedStatus: DeliverableStatus | null;
  selectedAssignee: string | null;
  searchQuery: string;
  viewMode: ViewMode;
  onPhaseChange: (phaseId: string | null) => void;
  onStatusChange: (status: DeliverableStatus | null) => void;
  onAssigneeChange: (assigneeId: string | null) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  phases,
  teamMembers,
  selectedPhaseId,
  selectedStatus,
  selectedAssignee,
  searchQuery,
  viewMode,
  onPhaseChange,
  onStatusChange,
  onAssigneeChange,
  onSearchChange,
  onViewModeChange,
}) => {
  const hasActiveFilters = selectedPhaseId || selectedStatus || selectedAssignee || searchQuery;

  const clearFilters = () => {
    onPhaseChange(null);
    onStatusChange(null);
    onAssigneeChange(null);
    onSearchChange('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {/* Phase Filter */}
        <div className="relative">
          <select
            value={selectedPhaseId || ''}
            onChange={(e) => onPhaseChange(e.target.value || null)}
            className="appearance-none bg-depth-base border border-depth-border rounded-lg px-3 py-1.5 pr-8 text-sm text-text-primary focus:border-radiance-gold focus:outline-none cursor-pointer"
          >
            <option value="">All Phases</option>
            {phases.map((phase) => (
              <option key={phase.id} value={phase.id}>
                Phase {phase.phase_number}: {phase.phase_name}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus || ''}
            onChange={(e) => onStatusChange((e.target.value as DeliverableStatus) || null)}
            className="appearance-none bg-depth-base border border-depth-border rounded-lg px-3 py-1.5 pr-8 text-sm text-text-primary focus:border-radiance-gold focus:outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="completed">Completed</option>
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Assignee Filter */}
        <UserAssignmentDropdown
          value={selectedAssignee}
          onChange={onAssigneeChange}
          teamMembers={teamMembers}
          placeholder="All Team"
          size="sm"
        />

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deliverables..."
            className="bg-depth-base border border-depth-border rounded-lg pl-9 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none w-[180px]"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-text-muted hover:text-radiance-gold transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* View Toggle */}
      <ViewToggle value={viewMode} onChange={onViewModeChange} />
    </div>
  );
};

export default FilterBar;
