/**
 * Admin Header Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/ui';
import { Heading, Text } from '@/components/ui';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  const { data: session } = useSession();

  return (
    <header className="relative bg-depth-surface border-b border-depth-border py-6 md:py-8 overflow-hidden">
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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Admin_Panel::Management_System
              </span>
            </div>
            <Heading level="h1" className="text-2xl md:text-3xl font-bold text-text-primary">
              {title}
            </Heading>
            {subtitle && (
              <Text variant="body" className="text-text-secondary mt-2">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="flex items-center gap-4">
            {actions}
            <Link
              href="/portfolio"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-radiance-gold transition-colors rounded-lg hover:bg-depth-elevated"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Portfolio
            </Link>
            {session?.user && (
              <div className="flex items-center gap-3 pl-4 border-l border-depth-border">
                <div className="w-8 h-8 rounded-lg bg-radiance-gold/20 flex items-center justify-center">
                  <span className="text-radiance-gold text-sm font-semibold">
                    {session.user.name?.[0] || 'A'}
                  </span>
                </div>
                <span className="text-text-secondary text-sm">
                  {session.user.name}
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
