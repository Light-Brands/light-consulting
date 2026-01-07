/**
 * Main Application Component
 * Light Brand Consulting
 */

import React, { useState, useEffect } from 'react';
import { Navigation, Footer } from './components';
import {
  HomePage,
  ServicesPage,
  ServiceDetailPage,
  AboutPage,
  BookPage,
  ContactPage,
  InsightsPage,
} from './pages';
import { PageKey } from './types';
import { scrollToTop } from './lib/utils';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageKey>('home');

  // Handle navigation
  const handleNavigate = (page: PageKey) => {
    setActivePage(page);
    scrollToTop();
  };

  // Parse URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1) || 'home';
    if (hash) {
      setActivePage(hash as PageKey);
    }
  }, []);

  // Update URL hash when page changes
  useEffect(() => {
    window.location.hash = activePage === 'home' ? '' : activePage;
  }, [activePage]);

  // Listen for browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setActivePage(hash as PageKey);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render the current page
  const renderPage = () => {
    // Handle service detail pages
    if (activePage.startsWith('services/')) {
      const serviceKey = activePage.split('/')[1];
      return (
        <ServiceDetailPage
          serviceKey={serviceKey}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'book':
        return <BookPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'insights':
        return <InsightsPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-depth-base text-text-primary antialiased selection:bg-radiance-gold selection:text-depth-base">
      {/* Navigation */}
      <Navigation activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Ambient Glow Effects */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-radiance-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-wisdom-violet/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default App;
