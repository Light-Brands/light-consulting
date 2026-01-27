/**
 * Brands Mobile Routing Page
 * Light Brand Consulting
 *
 * Simple routing page for mobile navigation to Clients, Projects, and Development
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Clients',
    href: '/admin/clients',
    description: 'Client directory and details',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '/admin/client-projects',
    description: 'Active client engagements',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Development',
    href: '/admin/work',
    description: 'Development work items',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-depth-base">
      <div className="px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Brands</h1>
        <p className="text-text-secondary mb-6">Manage clients and projects</p>

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
