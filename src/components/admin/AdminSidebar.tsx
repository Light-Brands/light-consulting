/**
 * Admin Sidebar Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  defaultOpen?: boolean;
}

// Icons
const icons = {
  commandCenter: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  myDashboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  prospects: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  leads: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  proposals: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  brands: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  clients: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  projects: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  development: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  portfolio: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  manage: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  team: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  chevron: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
};

// Top-level standalone items
const topItems: NavItem[] = [
  {
    label: 'Command Center',
    href: '/admin',
    icon: icons.commandCenter,
  },
  {
    label: 'My Dashboard',
    href: '/admin/my-dashboard',
    icon: icons.myDashboard,
  },
];

// Collapsible sections
const navSections: NavSection[] = [
  {
    label: 'Prospects',
    icon: icons.prospects,
    defaultOpen: false,
    items: [
      { label: 'Leads', href: '/admin/leads', icon: icons.leads },
      { label: 'Proposals', href: '/admin/proposals', icon: icons.proposals },
    ],
  },
  {
    label: 'Brands',
    icon: icons.brands,
    defaultOpen: false,
    items: [
      { label: 'Clients', href: '/admin/clients', icon: icons.clients },
      { label: 'Projects', href: '/admin/client-projects', icon: icons.projects },
      { label: 'Development', href: '/admin/work', icon: icons.development },
    ],
  },
];

// Bottom standalone items
const bottomItems: NavItem[] = [
  {
    label: 'Portfolio',
    href: '/admin/projects',
    icon: icons.portfolio,
  },
];

// Manage section
const manageSection: NavSection = {
  label: 'Manage',
  icon: icons.manage,
  defaultOpen: false,
  items: [
    { label: 'Team', href: '/admin/team', icon: icons.team },
    { label: 'Users', href: '/admin/users', icon: icons.users },
  ],
};

// NavLink component for individual items
const NavLink: React.FC<{ item: NavItem; pathname: string; nested?: boolean }> = ({
  item,
  pathname,
  nested = false
}) => {
  const isActive = pathname === item.href ||
    (item.href !== '/admin' && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={cn(
        'relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group/nav overflow-hidden',
        nested && 'ml-4 pl-4',
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
  );
};

// Collapsible section component
const CollapsibleSection: React.FC<{
  section: NavSection;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ section, pathname, isOpen, onToggle }) => {
  const hasActiveChild = section.items.some(
    item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
  );

  return (
    <div>
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all group/section',
          hasActiveChild
            ? 'text-radiance-gold'
            : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
        )}
      >
        <div className="flex items-center gap-3">
          {section.icon}
          <span className="font-medium text-sm">{section.label}</span>
        </div>
        <div className={cn(
          'transition-transform duration-200',
          isOpen && 'rotate-90'
        )}>
          {icons.chevron}
        </div>
      </button>

      {/* Collapsible content */}
      <div className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="mt-1 space-y-1">
          {section.items.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} nested />
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user, isConfigured } = useAuth();

  // Initialize section open states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach(section => {
      initial[section.label] = section.defaultOpen ?? false;
    });
    initial[manageSection.label] = manageSection.defaultOpen ?? false;
    return initial;
  });

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

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
      <nav className="relative z-10 flex-1 p-4 overflow-y-auto">
        {/* Top standalone items */}
        <div className="space-y-1 mb-4">
          {topItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* Collapsible sections */}
        <div className="space-y-2 mb-4">
          {navSections.map((section) => (
            <CollapsibleSection
              key={section.label}
              section={section}
              pathname={pathname}
              isOpen={openSections[section.label]}
              onToggle={() => toggleSection(section.label)}
            />
          ))}
        </div>

        {/* Bottom standalone items */}
        <div className="space-y-1 mb-4">
          {bottomItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        {/* Manage section */}
        <div className="pt-4 border-t border-depth-border">
          <CollapsibleSection
            section={manageSection}
            pathname={pathname}
            isOpen={openSections[manageSection.label]}
            onToggle={() => toggleSection(manageSection.label)}
          />
        </div>
      </nav>

      {/* User info and Footer */}
      <div className="relative z-10 p-4 border-t border-depth-border">
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
