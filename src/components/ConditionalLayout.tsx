'use client';

/**
 * Conditional Layout Component
 * Shows navigation and footer only on non-admin routes
 */

import { usePathname } from 'next/navigation';
import { NavigationWrapper } from '@/components/NavigationWrapper';
import { FooterWrapper } from '@/components/FooterWrapper';

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isProposalRoute = pathname?.startsWith('/proposals/');
  const isFunnelRoute = pathname?.startsWith('/funnel');
  const isDiagnosticRoute = pathname === '/book';
  const isAssessmentRoute = pathname?.startsWith('/assessment');

  if (isAdminRoute || isProposalRoute || isFunnelRoute || isDiagnosticRoute || isAssessmentRoute) {
    // Admin, proposal, funnel, diagnostic, and assessment routes: no nav/footer
    return (
      <>
        {children}
        {/* Global Ambient Glow Effects */}
        <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-radiance-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-wisdom-violet/5 blur-[120px] rounded-full pointer-events-none" />
      </>
    );
  }

  // Regular routes: show nav and footer
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <NavigationWrapper />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <FooterWrapper />

      {/* Global Ambient Glow Effects */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-radiance-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-wisdom-violet/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
