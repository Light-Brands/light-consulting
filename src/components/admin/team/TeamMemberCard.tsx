/**
 * Team Member Card Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { UserProfile, SystemRole } from '@/types/users';

interface TeamMemberCardProps {
  member: UserProfile & {
    active_projects_count?: number;
    active_todos_count?: number;
  };
  onEdit?: (id: string) => void;
  onDeactivate?: (id: string) => void;
}

const ROLE_COLORS: Record<SystemRole, string> = {
  admin: 'text-radiance-gold bg-radiance-gold/10',
  team_member: 'text-blue-400 bg-blue-500/10',
  client: 'text-purple-400 bg-purple-500/10',
};

const ROLE_LABELS: Record<SystemRole, string> = {
  admin: 'Admin',
  team_member: 'Team',
  client: 'Client',
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRelativeTime = (dateString: string | null) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  onEdit,
  onDeactivate,
}) => {
  return (
    <div
      className={`
        bg-depth-surface border border-depth-border rounded-xl p-4
        hover:border-radiance-gold/30 transition-all group
        ${!member.is_active ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {member.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.full_name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center">
              <span className="text-depth-base font-semibold text-sm">
                {getInitials(member.full_name)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-text-primary truncate">
              {member.full_name}
            </h3>
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                ROLE_COLORS[member.system_role]
              }`}
            >
              {ROLE_LABELS[member.system_role]}
            </span>
            {!member.is_active && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-400">
                Inactive
              </span>
            )}
          </div>

          <p className="text-sm text-text-muted truncate">{member.email}</p>

          <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
            {member.active_projects_count !== undefined && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {member.active_projects_count} projects
              </span>
            )}
            {member.active_todos_count !== undefined && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {member.active_todos_count} todos
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getRelativeTime(member.last_login_at)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(member.id)}
              className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDeactivate && member.is_active && (
            <button
              onClick={() => onDeactivate(member.id)}
              className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Deactivate"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
