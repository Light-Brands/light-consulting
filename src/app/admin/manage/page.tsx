/**
 * Manage Mobile Routing Page
 * Light Brand Consulting
 *
 * Simple routing page for mobile navigation to Team and Users
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Team',
    href: '/admin/team',
    description: 'Team members and roles',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: 'Users',
    href: '/admin/users',
    description: 'User accounts and access',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-depth-base">
      <div className="px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Manage</h1>
        <p className="text-text-secondary mb-6">Team and user management</p>

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
