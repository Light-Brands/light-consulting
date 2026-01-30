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
  financials: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  marketing: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  funnelGallery: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  offers: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  vercel: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 76 76">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  ),
  supabase: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 109 113">
      <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fillOpacity="0.8" />
      <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.04088L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.16518 56.4175L45.317 2.07103Z" />
    </svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  documents: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  taxForms: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
  agreements: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  salesTools: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
    </svg>
  ),
  stackDiagnostic: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25" />
    </svg>
  ),
  offerPlaybook: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  planning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
    label: 'Sales Tools',
    icon: icons.salesTools,
    defaultOpen: false,
    items: [
      { label: 'Offer Playbook', href: '/admin/offer-playbook', icon: icons.offerPlaybook },
      { label: 'Stack Diagnostic', href: '/admin/stack-diagnostic', icon: icons.stackDiagnostic },
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

// Strategy section
const strategySection: NavSection = {
  label: 'Strategy',
  icon: icons.planning,
  defaultOpen: false,
  items: [
    { label: 'Planning', href: '/admin/planning', icon: icons.documents },
  ],
};

// Marketing section
const marketingSection: NavSection = {
  label: 'Marketing',
  icon: icons.marketing,
  defaultOpen: false,
  items: [
    { label: 'Funnel Gallery', href: '/admin/funnel-gallery', icon: icons.funnelGallery },
    { label: 'Offers', href: '/admin/offers', icon: icons.offers },
  ],
};

// Analytics section
const analyticsSection: NavSection = {
  label: 'Analytics',
  icon: icons.analytics,
  defaultOpen: false,
  items: [
    { label: 'GitHub', href: '/admin/analytics/github', icon: icons.github },
    { label: 'Vercel', href: '/admin/analytics/vercel', icon: icons.vercel },
    { label: 'Supabase', href: '/admin/analytics/supabase', icon: icons.supabase },
  ],
};

// Bottom standalone items
const bottomItems: NavItem[] = [
  {
    label: 'Portfolio',
    href: '/admin/projects',
    icon: icons.portfolio,
  },
];

// Legal section
const legalSection: NavSection = {
  label: 'Legal',
  icon: icons.legal,
  defaultOpen: false,
  items: [
    { label: 'All Documents', href: '/admin/legal', icon: icons.documents },
    { label: 'Agreements', href: '/admin/legal/agreements', icon: icons.agreements },
  ],
};

// Manage section
const manageSection: NavSection = {
  label: 'Manage',
  icon: icons.manage,
  defaultOpen: false,
  items: [
    { label: 'Team', href: '/admin/team', icon: icons.team },
    { label: 'Users', href: '/admin/users', icon: icons.users },
    { label: 'Financials', href: '/admin/financials', icon: icons.financials },
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
    initial[strategySection.label] = strategySection.defaultOpen ?? false;
    initial[marketingSection.label] = marketingSection.defaultOpen ?? false;
    initial[analyticsSection.label] = analyticsSection.defaultOpen ?? false;
    initial[legalSection.label] = legalSection.defaultOpen ?? false;
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

        {/* Strategy section */}
        <div className="mb-4">
          <CollapsibleSection
            section={strategySection}
            pathname={pathname}
            isOpen={openSections[strategySection.label]}
            onToggle={() => toggleSection(strategySection.label)}
          />
        </div>

        {/* Marketing section */}
        <div className="mb-4">
          <CollapsibleSection
            section={marketingSection}
            pathname={pathname}
            isOpen={openSections[marketingSection.label]}
            onToggle={() => toggleSection(marketingSection.label)}
          />
        </div>

        {/* Analytics section */}
        <div className="mb-4">
          <CollapsibleSection
            section={analyticsSection}
            pathname={pathname}
            isOpen={openSections[analyticsSection.label]}
            onToggle={() => toggleSection(analyticsSection.label)}
          />
        </div>

        {/* Legal section */}
        <div className="mb-4">
          <CollapsibleSection
            section={legalSection}
            pathname={pathname}
            isOpen={openSections[legalSection.label]}
            onToggle={() => toggleSection(legalSection.label)}
          />
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
