/**
 * Admin Header Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Container } from '@/components/ui';
import { Heading, Text } from '@/components/ui';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  action?: React.ReactNode; // Alias for actions prop
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  actions,
  action,
}) => {
  const { user } = useAuth();
  const headerActions = actions || action;

  return (
    <header className="relative bg-depth-surface border-b border-depth-border py-4 md:py-8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-radiance-gold/3 blur-3xl pointer-events-none rounded-full -translate-y-1/2 translate-x-1/4" />

      {/* Subtle blueprint pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <Container size="wide" className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* Hide the admin panel label on mobile */}
            <div className="hidden md:flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Admin_Panel::Management_System
              </span>
            </div>
            <Heading level="h1" className="text-xl md:text-3xl font-bold text-text-primary truncate">
              {title}
            </Heading>
            {subtitle && (
              <Text variant="body" className="text-text-secondary mt-1 md:mt-2 text-sm md:text-base truncate">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {headerActions}
            {/* Hide View Portfolio link on mobile */}
            <Link
              href="/portfolio"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-radiance-gold transition-colors rounded-lg hover:bg-depth-elevated"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Portfolio
            </Link>
            {/* Hide user info on mobile */}
            {user && (
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-depth-border">
                <div className="w-8 h-8 rounded-lg bg-radiance-gold/20 flex items-center justify-center">
                  <span className="text-radiance-gold text-sm font-semibold">
                    {user.email?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-text-secondary text-sm truncate max-w-[150px]" title={user.email || ''}>
                  {user.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AdminHeader;
