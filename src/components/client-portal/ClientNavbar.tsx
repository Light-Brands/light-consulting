/**
 * Client Navbar Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClientNavbarProps {
  projectName?: string;
  clientName?: string;
}

export const ClientNavbar: React.FC<ClientNavbarProps> = ({
  projectName,
  clientName,
}) => {
  const pathname = usePathname();

  return (
    <header className="bg-depth-surface border-b border-depth-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Link href="/client-portal" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination group-hover:shadow-illumination-intense transition-all">
                <span className="text-depth-base font-bold text-sm">LB</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-text-primary font-semibold block">Light Brand</span>
                <span className="text-text-muted text-xs">Client Portal</span>
              </div>
            </Link>

            {/* Breadcrumb */}
            {projectName && (
              <>
                <div className="hidden md:block w-px h-6 bg-depth-border" />
                <div className="hidden md:block">
                  <p className="text-text-primary font-medium text-sm truncate max-w-[200px]">
                    {projectName}
                  </p>
                  {clientName && (
                    <p className="text-text-muted text-xs">{clientName}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            <Link
              href="/client-portal"
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                pathname === '/client-portal'
                  ? 'text-radiance-gold bg-radiance-gold/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/client-portal/projects"
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                pathname?.startsWith('/client-portal/projects')
                  ? 'text-radiance-gold bg-radiance-gold/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
              }`}
            >
              Projects
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ClientNavbar;
