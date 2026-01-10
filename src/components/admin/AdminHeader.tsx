/**
 * Admin Header Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

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
    <header className="bg-depth-surface border-b border-depth-border px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {actions}
          <Link
            href="/portfolio"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Portfolio
          </Link>
          {session?.user && (
            <div className="flex items-center gap-3 pl-4 border-l border-depth-border">
              <div className="w-8 h-8 rounded-full bg-radiance-gold/20 flex items-center justify-center">
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
    </header>
  );
};

export default AdminHeader;
