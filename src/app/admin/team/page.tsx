/**
 * Team Management Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { TeamMemberCard, InviteTeamModal } from '@/components/admin/team';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { UserProfile, SystemRole } from '@/types/users';

export default function TeamPage() {
  const [team, setTeam] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [includeInactive, setIncludeInactive] = useState(false);
  const { authFetch } = useAuthFetch();

  const fetchTeam = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (roleFilter) params.set('role', roleFilter);
      if (includeInactive) params.set('include_inactive', 'true');

      const response = await authFetch(`/api/admin/team?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setTeam(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, roleFilter, includeInactive]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const handleInvite = async (data: { email: string; full_name: string; role: SystemRole }) => {
    const response = await authFetch('/api/admin/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }

    fetchTeam();
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this team member?')) return;

    try {
      await authFetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      });
      fetchTeam();
    } catch (error) {
      console.error('Error deactivating team member:', error);
    }
  };

  const stats = {
    total: team.length,
    admins: team.filter((m) => m.system_role === 'admin').length,
    members: team.filter((m) => m.system_role === 'team_member').length,
    active: team.filter((m) => m.is_active).length,
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Team"
        subtitle="Manage team members and invitations"
        action={
          <Button variant="primary" size="sm" onClick={() => setShowInviteModal(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Invite Member
          </Button>
        }
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
              { label: 'Admins', value: stats.admins, color: 'text-amber-400' },
              { label: 'Members', value: stats.members, color: 'text-blue-400' },
              { label: 'Active', value: stats.active, color: 'text-green-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary text-sm focus:border-radiance-gold focus:outline-none"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="team_member">Team Member</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={includeInactive}
                onChange={(e) => setIncludeInactive(e.target.checked)}
                className="rounded border-depth-border bg-depth-base accent-radiance-gold"
              />
              Show inactive
            </label>
          </div>

          {/* Team List */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Team::Members
                </span>
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Team Members
              </h2>
            </div>

            <div className="p-4 md:p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-depth-elevated rounded-xl p-4 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-depth-border" />
                        <div className="flex-1">
                          <div className="h-4 bg-depth-border rounded w-1/3 mb-2" />
                          <div className="h-3 bg-depth-border rounded w-1/4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : team.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-depth-elevated rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-text-muted mb-4">No team members found</p>
                  <Button variant="primary" size="sm" onClick={() => setShowInviteModal(true)}>
                    Invite your first team member
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {team.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      onDeactivate={handleDeactivate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteTeamModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInvite}
        />
      )}
    </div>
  );
}
