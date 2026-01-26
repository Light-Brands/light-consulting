/**
 * Register Form Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
  invitationToken?: string;
  prefilledEmail?: string;
  prefilledName?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  invitationToken,
  prefilledEmail,
  prefilledName,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: prefilledName || '',
    email: prefilledEmail || '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          invitation_token: invitationToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Redirect to login or client portal
      router.push(invitationToken ? '/client-portal' : '/auth/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-text-secondary mb-2">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!!prefilledEmail}
          className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          placeholder="you@company.com"
        />
        {prefilledEmail && (
          <p className="mt-1 text-xs text-text-muted">
            Email is locked to the invitation
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
          placeholder="••••••••"
        />
        <p className="mt-1 text-xs text-text-muted">
          Must be at least 8 characters
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          required
          className="mt-1 w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50"
        />
        <label htmlFor="terms" className="text-sm text-text-muted">
          I agree to the{' '}
          <Link href="/terms" className="text-radiance-gold hover:text-radiance-amber">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-radiance-gold hover:text-radiance-amber">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-radiance-gold to-radiance-amber text-depth-base font-semibold rounded-lg hover:shadow-illumination transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Creating account...
          </span>
        ) : (
          'Create account'
        )}
      </button>

      {!invitationToken && (
        <p className="text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-radiance-gold hover:text-radiance-amber transition-colors"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
