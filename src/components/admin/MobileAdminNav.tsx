/**
 * Mobile Admin Navigation Component
 * Light Brand Consulting
 *
 * A clean bottom navigation bar for mobile admin experience
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchPaths?: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/admin',
    matchPaths: ['/admin'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Command',
    href: '/admin/command-center',
    matchPaths: ['/admin/command-center'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    label: 'Tasks',
    href: '/admin/my-dashboard',
    matchPaths: ['/admin/my-dashboard'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Work',
    href: '/admin/work',
    matchPaths: ['/admin/work', '/admin/projects', '/admin/proposals'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Team',
    href: '/admin/team',
    matchPaths: ['/admin/team', '/admin/leads', '/admin/users'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export const MobileAdminNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.href === '/admin') {
      return pathname === '/admin';
    }
    return item.matchPaths?.some(path => pathname.startsWith(path)) ?? false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-depth-surface/95 backdrop-blur-lg border-t border-depth-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-xl transition-all',
                active
                  ? 'text-radiance-gold bg-radiance-gold/10'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <div className={cn(
                'transition-transform',
                active && 'scale-110'
              )}>
                {item.icon}
              </div>
              <span className={cn(
                'text-[10px] font-medium mt-1 transition-colors',
                active ? 'text-radiance-gold' : 'text-text-muted'
              )}>
                {item.label}
              </span>
              {active && (
                <div className="absolute -top-0.5 w-8 h-0.5 bg-radiance-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileAdminNav;
