/**
 * Prospects Mobile Routing Page
 * Light Brand Consulting
 *
 * Simple routing page for mobile navigation to Leads and Proposals
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Leads',
    href: '/admin/leads',
    description: 'Incoming leads and inquiries',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    label: 'Proposals',
    href: '/admin/proposals',
    description: 'Client proposals and quotes',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function ProspectsPage() {
  return (
    <div className="min-h-screen bg-depth-base">
      <div className="px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Prospects</h1>
        <p className="text-text-secondary mb-6">Manage leads and proposals</p>

        <div className="space-y-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center gap-4 p-4',
                'bg-depth-surface border border-depth-border rounded-xl',
                'hover:border-radiance-gold/30 hover:bg-depth-elevated',
                'transition-all duration-200 active:scale-[0.98]'
              )}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-radiance-gold/10 flex items-center justify-center text-radiance-gold">
                {route.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-text-primary">{route.label}</h2>
                <p className="text-sm text-text-muted">{route.description}</p>
              </div>
              <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
