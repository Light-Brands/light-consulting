/**
 * Funnel Gallery Page Component
 * Light Brand Consulting
 *
 * Password-protected gallery view of all funnel pages
 * - Gallery grid view with filterable cards
 * - Copy link functionality
 * - Tier-based filtering
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Heading, Text } from '@/components/ui';
import Button from '@/components/Button';
import type { PageKey } from '@/types';

interface FunnelGalleryProps {
  onNavigate: (page: PageKey) => void;
}

// Funnel data extracted from all funnel pages
const FUNNELS = [
  {
    id: 0,
    route: 'funnel',
    title: 'AI Readiness Diagnostic',
    tier: 'Core',
    description: 'Sell clarity, not commitment. Discover how prepared your business really is for the AI decade.',
    target: 'Business owners evaluating AI readiness',
  },
  {
    id: 2,
    route: 'funnel2',
    title: 'Web2 to AI-Native Transformation',
    tier: 'Core',
    description: 'Help clients understand the foundational shift from traditional website to AI intelligence system.',
    target: 'Businesses with outdated web infrastructure',
  },
  {
    id: 3,
    route: 'funnel3',
    title: 'AI Intelligent System',
    tier: 'Core',
    description: 'Position AI as a system that works for them. Build leverage through automation and intelligence.',
    target: 'Founders capped by outdated infrastructure',
  },
  {
    id: 4,
    route: 'funnel4',
    title: 'AI Intelligence Ascension',
    tier: 'Core',
    description: 'AI-powered client ascension system. From diagnostic to delivery to expansion.',
    target: 'Clients ready for full AI transformation journey',
  },
  {
    id: 5,
    route: 'funnel5',
    title: 'Light Workers',
    tier: 'Core',
    description: 'For purpose-driven visionaries bringing their ideas to the planet with the right systems.',
    target: 'Light workers, conscious entrepreneurs, mission-driven founders',
  },
  {
    id: 6,
    route: 'funnel6',
    title: 'AI Pilot Rescue',
    tier: 'Core',
    description: 'Your AI Pilot Isn\'t Broken. Your Scaling Strategy Is.',
    target: '67% of companies stuck between pilot and scaling',
  },
  {
    id: 7,
    route: 'funnel7',
    title: 'AI Governance Shield',
    tier: 'Core',
    description: 'AI Compliance Isn\'t Coming. It\'s Here.',
    target: 'Companies facing EU AI Act, state regulations',
  },
  {
    id: 8,
    route: 'funnel8',
    title: 'Fractional AI Officer',
    tier: 'Core',
    description: 'AI Strategy Without the C-Suite Price Tag.',
    target: 'Companies needing AI strategy without $250-400K exec',
  },
  {
    id: 9,
    route: 'funnel9',
    title: 'AI Team Enablement',
    tier: 'Core',
    description: 'Your Team Doesn\'t Need AI Tools. They Need AI Fluency.',
    target: 'Companies with skill gaps (46% cite this as barrier)',
  },
  {
    id: 10,
    route: 'funnel10',
    title: 'AI Data Readiness',
    tier: 'Core',
    description: 'Your AI Is Only as Smart as Your Data Lets It Be.',
    target: '57% say data isn\'t AI-ready; 60% of projects fail due to data',
  },
  {
    id: 11,
    route: 'funnel11',
    title: 'AI ROI Audit',
    tier: 'Core',
    description: 'Why Your AI Investment Isn\'t Paying Off (And How to Fix It).',
    target: 'Fewer than 30% of CEOs satisfied with AI returns',
  },
  {
    id: 12,
    route: 'funnel12',
    title: 'Agentic AI Readiness',
    tier: 'Core',
    description: 'AI Agents Are Taking Over Workflows. Is Your Business Ready?',
    target: '2026 is the year of agentic AI, only 23% scaling any agentic system',
  },
  {
    id: 13,
    route: 'funnel13',
    title: 'AI Use Case Finder',
    tier: 'Core',
    description: 'Stop Guessing Where AI Should Live.',
    target: '42% cite unclear use cases as major barrier',
  },
  {
    id: 14,
    route: 'funnel14',
    title: 'AI Intelligence Maintenance',
    tier: 'Core',
    description: 'Your AI System Is Built. Now Keep It Running at Peak Performance.',
    target: 'Companies with existing AI systems needing maintenance',
  },
  {
    id: 15,
    route: 'funnel15',
    title: 'AI for Professional Services',
    tier: 'Industry',
    description: 'AI That Understands Professional Services.',
    target: 'Law firms, accounting, consulting, agencies',
  },
  {
    id: 16,
    route: 'funnel16',
    title: 'AI for E-Commerce',
    tier: 'Industry',
    description: 'AI That Understands E-Commerce.',
    target: 'DTC brands, retailers, marketplaces',
  },
  {
    id: 17,
    route: 'funnel17',
    title: 'AI for Healthcare',
    tier: 'Industry',
    description: 'AI That Understands Healthcare Complexity.',
    target: 'Health systems, clinics, health tech',
  },
  {
    id: 18,
    route: 'funnel18',
    title: 'AI for Financial Services',
    tier: 'Industry',
    description: 'AI That Understands Financial Services Regulation.',
    target: 'Banks, credit unions, wealth management, insurance',
  },
  {
    id: 19,
    route: 'funnel19',
    title: 'AI Maturity Bootcamp',
    tier: 'Education',
    description: 'From AI Curious to AI Confident in 8 Weeks.',
    target: 'Leaders wanting structured AI education',
  },
  {
    id: 20,
    route: 'funnel20',
    title: 'AI Executive Briefing',
    tier: 'Education',
    description: 'Stay Ahead of AI Without the Noise.',
    target: 'Executives wanting to stay current on AI',
  },
  {
    id: 21,
    route: 'funnel21',
    title: 'AI Pilot Rescue',
    tier: 'Tier 1',
    description: 'Your AI Pilot Isn\'t Broken. Your Scaling Strategy Is.',
    target: '67% of companies stuck between pilot and scaling phases',
  },
  {
    id: 22,
    route: 'funnel22',
    title: 'AI Governance Shield',
    tier: 'Tier 1',
    description: 'AI Compliance Isn\'t Coming. It\'s Here.',
    target: 'Companies facing EU AI Act, Colorado AI Act, state regulations',
  },
  {
    id: 23,
    route: 'funnel23',
    title: 'Fractional AI Officer',
    tier: 'Tier 1',
    description: 'AI Strategy Without the C-Suite Price Tag.',
    target: 'Companies needing AI strategy without $250-400K full-time hire',
  },
  {
    id: 24,
    route: 'funnel24',
    title: 'AI Team Enablement',
    tier: 'Tier 1',
    description: 'Your Team Is Your AI Strategy\'s Biggest Variable.',
    target: 'Organizations where 46% cite skill gaps as top barrier',
  },
  {
    id: 25,
    route: 'funnel25',
    title: 'AI Data Readiness',
    tier: 'Tier 2',
    description: 'Your Data Isn\'t AI-Ready. Yet.',
    target: 'Organizations where 57% say their data isn\'t AI-ready',
  },
  {
    id: 26,
    route: 'funnel26',
    title: 'AI ROI Audit',
    tier: 'Tier 2',
    description: 'Is Your AI Actually Delivering Value?',
    target: 'Organizations where fewer than 30% of CEOs are satisfied with AI returns',
  },
  {
    id: 27,
    route: 'funnel27',
    title: 'Agentic AI Readiness',
    tier: 'Tier 2',
    description: '2026 Is the Year of Agentic AI. Are You Ready?',
    target: 'Forward-thinking companies preparing for the agentic AI wave',
  },
  {
    id: 28,
    route: 'funnel28',
    title: 'AI Use Case Finder',
    tier: 'Tier 2',
    description: 'Stop Guessing. Find the AI Use Cases That Actually Matter.',
    target: 'Organizations where 42% cite unclear use cases as barrier',
  },
  {
    id: 29,
    route: 'funnel29',
    title: 'Business for Healers',
    tier: 'Tier 3',
    description: 'Your Healing Gift Deserves a Business That Honors It.',
    target: 'Energy healers, Reiki practitioners, intuitive healers, bodyworkers',
  },
  {
    id: 30,
    route: 'funnel30',
    title: 'Business for Spiritual Coaches',
    tier: 'Tier 3',
    description: 'Stop Competing With Life Coaches. Start Leading Transformation.',
    target: 'Spiritual coaches, life coaches, transformational coaches',
  },
  {
    id: 31,
    route: 'funnel31',
    title: 'Business for Course Creators',
    tier: 'Tier 3',
    description: 'Your Wisdom Deserves More Than a Udemy Course.',
    target: 'Spiritual teachers, wellness educators, transformational course creators',
  },
  {
    id: 32,
    route: 'funnel32',
    title: 'Business for Retreat Leaders',
    tier: 'Tier 3',
    description: 'Your Retreat Changes Lives. Now Build a Business Around It.',
    target: 'Retreat facilitators, wellness travel leaders, experience creators',
  },
  {
    id: 33,
    route: 'funnel33',
    title: 'Light Worker Business Academy',
    tier: 'Tier 4',
    description: 'The Business School They Never Built for Light Workers.',
    target: 'Light workers ready for deep business education',
  },
  {
    id: 34,
    route: 'funnel34',
    title: 'Light Leader Newsletter',
    tier: 'Tier 4',
    description: 'Weekly Wisdom for Purpose-Driven Entrepreneurs.',
    target: 'Light workers wanting ongoing business insights',
  },
  {
    id: 35,
    route: 'funnel35',
    title: 'Annual Light Workers Summit',
    tier: 'Tier 4',
    description: 'The Annual Gathering for Purpose-Driven Entrepreneurs.',
    target: 'Light workers seeking community and advanced learning',
  },
  {
    id: 36,
    route: 'funnel36',
    title: 'Vision Keeper Retainer',
    tier: 'Tier 4',
    description: 'Your Business Deserves a Strategic Partner Who Gets It.',
    target: 'Established light workers wanting ongoing strategic partnership',
  },
];

// Tier filter options
const TIER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Core', value: 'Core' },
  { label: 'Industry', value: 'Industry' },
  { label: 'Education', value: 'Education' },
  { label: 'Tier 1', value: 'Tier 1' },
  { label: 'Tier 2', value: 'Tier 2' },
  { label: 'Tier 3', value: 'Tier 3' },
  { label: 'Tier 4', value: 'Tier 4' },
];

// Tier color mapping
const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Core':
      return 'bg-radiance-gold/20 text-radiance-gold border-radiance-gold/30';
    case 'Industry':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Education':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Tier 1':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Tier 2':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    case 'Tier 3':
      return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
    case 'Tier 4':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    default:
      return 'bg-depth-elevated text-text-secondary border-depth-border';
  }
};

// Password for accessing the gallery (can be configured via env variable)
const GALLERY_PASSWORD = process.env.NEXT_PUBLIC_FUNNEL_GALLERY_PASSWORD || 'lightbrand2024';

export const FunnelGallery: React.FC<FunnelGalleryProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTier, setActiveTier] = useState('all');
  const [filteredFunnels, setFilteredFunnels] = useState(FUNNELS);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Check for stored authentication on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('funnel-gallery-auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Filter funnels by tier
  useEffect(() => {
    if (activeTier === 'all') {
      setFilteredFunnels(FUNNELS);
    } else {
      setFilteredFunnels(FUNNELS.filter((f) => f.tier === activeTier));
    }
  }, [activeTier]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GALLERY_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('funnel-gallery-auth', 'true');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const copyToClipboard = async (route: string, id: number) => {
    const url = `${window.location.origin}/${route}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-depth-base">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md px-6"
        >
          <div className="bg-depth-elevated border border-depth-border rounded-2xl p-8 shadow-xl">
            {/* Lock icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-radiance-gold/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-radiance-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-text-primary text-center mb-2">
              Funnel Gallery
            </h2>
            <p className="text-text-secondary text-center mb-6">
              Enter the password to access the funnel gallery
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-depth-surface border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold/50"
                  autoFocus
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Access Gallery
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main gallery view
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <Container size="wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Funnel{' '}
              <span className="text-gradient-illumination">Gallery</span>
            </Heading>
            <Text variant="lead" className="text-text-secondary mb-4">
              All {FUNNELS.length} funnel pages in one place. Click to view, copy
              the link to share.
            </Text>
            <p className="text-text-muted text-sm">
              Showing {filteredFunnels.length} of {FUNNELS.length} funnels
            </p>
          </motion.div>

          {/* Tier Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-8"
            role="tablist"
            aria-label="Filter funnels by tier"
          >
            {TIER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveTier(option.value)}
                role="tab"
                aria-selected={activeTier === option.value}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTier === option.value
                    ? 'bg-radiance-gold text-depth-base'
                    : 'bg-depth-surface text-text-secondary hover:text-text-primary hover:bg-depth-elevated border border-depth-border'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Gallery Grid */}
      <Section className="pb-20 md:pb-32">
        <Container size="wide">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredFunnels.map((funnel, index) => (
                <motion.div
                  key={funnel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-depth-elevated border border-depth-border rounded-2xl overflow-hidden hover:border-radiance-gold/30 transition-all duration-300"
                >
                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Header with tier badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getTierColor(
                            funnel.tier
                          )}`}
                        >
                          {funnel.tier}
                        </span>
                      </div>
                      <span className="text-text-muted text-xs font-mono">
                        #{funnel.id === 0 ? 'main' : funnel.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-radiance-gold transition-colors">
                      {funnel.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                      {funnel.description}
                    </p>

                    {/* Target */}
                    <p className="text-text-muted text-xs">
                      <span className="font-medium">Target:</span> {funnel.target}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      {/* View button */}
                      <button
                        onClick={() => onNavigate(funnel.route as PageKey)}
                        className="flex-1 px-4 py-2 bg-radiance-gold/10 text-radiance-gold text-sm font-medium rounded-lg hover:bg-radiance-gold/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </button>

                      {/* Copy link button */}
                      <button
                        onClick={() => copyToClipboard(funnel.route, funnel.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                          copiedId === funnel.id
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-depth-surface text-text-secondary hover:text-text-primary hover:bg-depth-border'
                        }`}
                      >
                        {copiedId === funnel.id ? (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* Logout Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            sessionStorage.removeItem('funnel-gallery-auth');
            setIsAuthenticated(false);
          }}
          className="px-4 py-2 bg-depth-elevated border border-depth-border rounded-lg text-text-secondary hover:text-text-primary text-sm transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
};

export default FunnelGallery;
