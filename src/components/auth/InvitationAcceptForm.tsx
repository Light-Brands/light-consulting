/**
 * Invitation Accept Form Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from './RegisterForm';

interface InvitationDetails {
  id: string;
  email: string;
  role: string;
  project_id?: string;
  project_name?: string;
  invited_by_name: string;
  expires_at: string;
  metadata?: {
    full_name?: string;
  };
}

interface InvitationAcceptFormProps {
  token: string;
}

export const InvitationAcceptForm: React.FC<InvitationAcceptFormProps> = ({ token }) => {
  const router = useRouter();
  const [invitation, setInvitation] = useState<InvitationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasExistingAccount, setHasExistingAccount] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    const validateInvitation = async () => {
      try {
        const response = await fetch(`/api/auth/validate-invitation?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to validate invitation');
        }

        if (!data.data.valid) {
          setError(data.data.reason || 'This invitation is no longer valid');
          return;
        }

        setInvitation(data.data.invitation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to validate invitation');
      } finally {
        setIsLoading(false);
      }
    };

    validateInvitation();
  }, [token]);

  const handleAcceptWithExistingAccount = async () => {
    setIsAccepting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/accept-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept invitation');
      }

      router.push(data.data.project_id
        ? `/client-portal/projects/${data.data.project_id}`
        : '/client-portal'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invitation');
    } finally {
      setIsAccepting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-depth-border border-t-radiance-gold animate-spin" />
        <p className="text-text-muted">Validating invitation...</p>
      </div>
    );
  }

  if (error && !invitation) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Invalid Invitation
        </h2>
        <p className="text-text-muted mb-6">{error}</p>
        <a
          href="/auth/login"
          className="inline-flex items-center gap-2 px-4 py-2 text-radiance-gold hover:text-radiance-amber transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to login
        </a>
      </div>
    );
  }

  if (!invitation) return null;

  return (
    <div className="space-y-8">
      {/* Invitation Details */}
      <div className="bg-depth-elevated border border-depth-border rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center">
            <svg className="w-6 h-6 text-depth-base" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-text-primary font-medium">
              You've been invited by {invitation.invited_by_name}
            </p>
            {invitation.project_name && (
              <p className="text-text-muted text-sm">
                To join project: {invitation.project_name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-muted">Email</p>
            <p className="text-text-primary">{invitation.email}</p>
          </div>
          <div>
            <p className="text-text-muted">Role</p>
            <p className="text-text-primary capitalize">{invitation.role}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Account Options */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setHasExistingAccount(false)}
            className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
              !hasExistingAccount
                ? 'bg-radiance-gold/10 border-radiance-gold/30 text-radiance-gold'
                : 'bg-depth-base border-depth-border text-text-secondary hover:text-text-primary'
            }`}
          >
            Create new account
          </button>
          <button
            onClick={() => setHasExistingAccount(true)}
            className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
              hasExistingAccount
                ? 'bg-radiance-gold/10 border-radiance-gold/30 text-radiance-gold'
                : 'bg-depth-base border-depth-border text-text-secondary hover:text-text-primary'
            }`}
          >
            I have an account
          </button>
        </div>

        {hasExistingAccount ? (
          <div className="space-y-4">
            <p className="text-text-muted text-sm">
              If you already have a Light Brand account, you can accept this invitation
              after signing in.
            </p>
            <button
              onClick={handleAcceptWithExistingAccount}
              disabled={isAccepting}
              className="w-full py-3 px-4 bg-gradient-to-r from-radiance-gold to-radiance-amber text-depth-base font-semibold rounded-lg hover:shadow-illumination transition-all disabled:opacity-50"
            >
              {isAccepting ? 'Accepting...' : 'Sign in & Accept Invitation'}
            </button>
            <p className="text-center text-xs text-text-muted">
              You'll be redirected to sign in if not already logged in
            </p>
          </div>
        ) : (
          <RegisterForm
            invitationToken={token}
            prefilledEmail={invitation.email}
            prefilledName={invitation.metadata?.full_name}
          />
        )}
      </div>
    </div>
  );
};

export default InvitationAcceptForm;
