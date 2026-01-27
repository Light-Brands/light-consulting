/**
 * Admin Users Management Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader, CollapsibleStats } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  is_team_member: boolean;
  team_role: string | null;
  team_name: string | null;
  is_active: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [promoteUser, setPromoteUser] = useState<AuthUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promoteName, setPromoteName] = useState('');
  const [promoteRole, setPromoteRole] = useState<'team_member' | 'admin'>('team_member');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { authFetch } = useAuthFetch();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/users');
      const data = await response.json();

      if (data.data) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsCreating(true);

    try {
      const response = await authFetch('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create user');
        return;
      }

      setSuccess(`User ${email} created successfully!`);
      setEmail('');
      setPassword('');
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handlePromoteToTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteUser) return;

    setError(null);
    setSuccess(null);
    setIsCreating(true);

    try {
      const response = await authFetch(`/api/admin/users/${promoteUser.id}/promote`, {
        method: 'POST',
        body: JSON.stringify({
          full_name: promoteName,
          role: promoteRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to promote user');
        return;
      }

      setSuccess(`${promoteName} has been added to the team!`);
      setShowPromoteModal(false);
      setPromoteUser(null);
      setPromoteName('');
      setPromoteRole('team_member');
      fetchUsers();
    } catch (error) {
      console.error('Error promoting user:', error);
      setError('Failed to promote user. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const openPromoteModal = (user: AuthUser) => {
    setPromoteUser(user);
    setPromoteName(user.team_name || '');
    setPromoteRole((user.team_role as 'team_member' | 'admin') || 'team_member');
    setShowPromoteModal(true);
    setError(null);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const stats = {
    total: users.length,
    team: users.filter(u => u.is_team_member).length,
    verified: users.filter(u => u.email_confirmed_at).length,
    active: users.filter(u => u.last_sign_in_at).length,
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Users"
        subtitle="All system users and team access"
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats */}
          <CollapsibleStats>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="bg-depth-surface border border-depth-border rounded-xl p-3 md:p-4">
                <p className="text-xl md:text-2xl font-bold text-text-primary">
                  {isLoading ? '-' : stats.total}
                </p>
                <p className="text-text-muted text-xs md:text-sm">Total Users</p>
              </div>
              <div className="bg-depth-surface border border-depth-border rounded-xl p-3 md:p-4">
                <p className="text-xl md:text-2xl font-bold text-radiance-gold">
                  {isLoading ? '-' : stats.team}
                </p>
                <p className="text-text-muted text-xs md:text-sm">Team Members</p>
              </div>
              <div className="bg-depth-surface border border-depth-border rounded-xl p-3 md:p-4">
                <p className="text-xl md:text-2xl font-bold text-green-400">
                  {isLoading ? '-' : stats.verified}
                </p>
                <p className="text-text-muted text-xs md:text-sm">Verified</p>
              </div>
              <div className="bg-depth-surface border border-depth-border rounded-xl p-3 md:p-4">
                <p className="text-xl md:text-2xl font-bold text-blue-400">
                  {isLoading ? '-' : stats.active}
                </p>
                <p className="text-text-muted text-xs md:text-sm">Active</p>
              </div>
            </div>
          </CollapsibleStats>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Create User Form */}
          {showForm ? (
            <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-4 md:p-6 mb-6 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Create New User</h2>
                  <button
                    onClick={() => { setShowForm(false); setError(null); }}
                    className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setError(null); }}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isCreating}>
                      {isCreating ? 'Creating...' : 'Create User'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <Button variant="primary" onClick={() => { setShowForm(true); setSuccess(null); }}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New User
              </Button>
            </div>
          )}

          {/* Users Table */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="relative z-10 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <h2 className="text-lg font-semibold text-text-primary">All Users</h2>
                <p className="text-sm text-text-muted">Users with team access can manage the admin portal</p>
              </div>

              {isLoading ? (
                <div className="p-6 text-center text-text-muted">Loading...</div>
              ) : users.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  No users found. Create a new user to get started.
                </div>
              ) : (
                <div className="overflow-x-auto max-w-full">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-depth-elevated">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                          Team Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                          Verified
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                          Last Sign In
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-depth-border">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-depth-elevated transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="font-medium text-text-primary">{user.email}</p>
                            {user.team_name && (
                              <p className="text-sm text-text-muted">{user.team_name}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {user.is_team_member ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold" />
                                {user.team_role === 'admin' ? 'Admin' : 'Team Member'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                User
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {user.email_confirmed_at ? (
                              <span className="text-green-400 text-sm">Yes</span>
                            ) : (
                              <span className="text-amber-400 text-sm">No</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-text-muted whitespace-nowrap">
                            {formatDate(user.last_sign_in_at)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button
                              onClick={() => openPromoteModal(user)}
                              className="px-3 py-1.5 text-xs font-medium bg-radiance-gold/10 text-radiance-gold hover:bg-radiance-gold/20 rounded-lg transition-colors"
                            >
                              {user.is_team_member ? 'Edit Team' : 'Add to Team'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Promote to Team Modal */}
      {showPromoteModal && promoteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-depth-surface border border-depth-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary">
                {promoteUser.is_team_member ? 'Edit Team Member' : 'Add to Team'}
              </h2>
              <button
                onClick={() => { setShowPromoteModal(false); setPromoteUser(null); setError(null); }}
                className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-text-muted mb-4">
              {promoteUser.is_team_member
                ? `Update team settings for ${promoteUser.email}`
                : `Add ${promoteUser.email} to the team to grant admin portal access.`
              }
            </p>

            <form onSubmit={handlePromoteToTeam} className="space-y-4">
              <div>
                <label htmlFor="promoteName" className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="promoteName"
                  value={promoteName}
                  onChange={(e) => setPromoteName(e.target.value)}
                  required
                  className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="promoteRole" className="block text-sm font-medium text-text-secondary mb-2">
                  Role
                </label>
                <select
                  id="promoteRole"
                  value={promoteRole}
                  onChange={(e) => setPromoteRole(e.target.value as 'team_member' | 'admin')}
                  className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none transition-colors"
                >
                  <option value="team_member">Team Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={() => { setShowPromoteModal(false); setPromoteUser(null); setError(null); }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isCreating}>
                  {isCreating ? 'Saving...' : (promoteUser.is_team_member ? 'Update' : 'Add to Team')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
