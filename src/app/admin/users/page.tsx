/**
 * Admin Users Management Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="User Management"
        subtitle="Create and manage authentication users"
      />

      <div className="py-8 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative bg-depth-surface border border-depth-border rounded-xl p-4 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10">
                <p className="text-2xl font-bold text-text-primary">
                  {isLoading ? '-' : users.length}
                </p>
                <p className="text-text-muted text-sm">Total Users</p>
              </div>
            </div>
            <div className="relative bg-depth-surface border border-depth-border rounded-xl p-4 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10">
                <p className="text-2xl font-bold text-text-primary">
                  {isLoading ? '-' : users.filter(u => u.email_confirmed_at).length}
                </p>
                <p className="text-text-muted text-sm">Verified Users</p>
              </div>
            </div>
            <div className="relative bg-depth-surface border border-depth-border rounded-xl p-4 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10">
                <p className="text-2xl font-bold text-text-primary">
                  {isLoading ? '-' : users.filter(u => u.last_sign_in_at).length}
                </p>
                <p className="text-text-muted text-sm">Active Users</p>
              </div>
            </div>
          </div>

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
            <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 mb-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Users::Create_New
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Create New User
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setError(null);
                    }}
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
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none focus:ring-1 focus:ring-radiance-gold/30 transition-colors"
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
                      className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none focus:ring-1 focus:ring-radiance-gold/30 transition-colors"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowForm(false);
                        setError(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isCreating}
                    >
                      {isCreating ? 'Creating...' : 'Create User'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <Button
                variant="primary"
                onClick={() => {
                  setShowForm(true);
                  setSuccess(null);
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New User
              </Button>
            </div>
          )}

          {/* Users Table */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10">
              <div className="p-6 border-b border-depth-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Users::All_Users
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Authentication Users
                </h2>
              </div>

              {isLoading ? (
                <div className="p-6 text-center text-text-muted">Loading...</div>
              ) : users.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  No users found. Create a new user to get started.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-depth-elevated">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                          Last Sign In
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-depth-border">
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-depth-elevated transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-medium text-text-primary">
                              {user.email}
                            </p>
                            <p className="text-xs text-text-muted font-mono mt-1">
                              {user.id.slice(0, 8)}...
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            {user.email_confirmed_at ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-muted">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-muted">
                            {formatDate(user.last_sign_in_at)}
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
    </div>
  );
}
