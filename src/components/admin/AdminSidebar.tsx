/**
 * Admin Sidebar Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'Command Center',
    href: '/admin/command-center',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    label: 'My Dashboard',
    href: '/admin/my-dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Leads',
    href: '/admin/leads',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Proposals',
    href: '/admin/proposals',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Work',
    href: '/admin/work',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: 'Team',
    href: '/admin/team',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user, isConfigured } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className="relative w-64 min-h-screen bg-depth-surface border-r border-depth-border flex flex-col overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 p-6 border-b border-depth-border">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination group-hover:shadow-illumination-intense transition-all group-hover:scale-105">
            <span className="text-depth-base font-bold text-sm">LB</span>
          </div>
          <div>
            <span className="text-text-primary font-semibold block">Light Brand</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-radiance-gold/50 animate-pulse" />
              <span className="text-text-muted text-xs font-mono">ADMIN</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4">
        <div className="mb-4 px-4">
          <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">Navigation</span>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all group/nav overflow-hidden',
                    isActive
                      ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
                  )}
                >
                  {/* Hover glow effect */}
                  <div className={cn(
                    'absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500 pointer-events-none',
                    isActive && 'opacity-100'
                  )} />

                  <div className="relative z-10 flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>

                  {isActive && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info and Footer */}
      <div className="p-4 border-t border-depth-border">
        {/* User email display */}
        {isConfigured && user?.email && (
          <div className="mb-3 px-4 py-2 bg-depth-elevated rounded-lg">
            <p className="text-text-muted text-xs font-mono truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
