/**
 * Insights Page (Blog/Thought Leadership)
 * Light Brand Consulting
 *
 * Phase 1: Placeholder with newsletter capture
 */

import React from 'react';
import {
  Card,
  Tag,
  NewsletterCapture,
} from '../components';
import { PageKey } from '../types';

interface InsightsPageProps {
  onNavigate: (page: PageKey) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  // Placeholder posts for Phase 1
  const comingSoonPosts = [
    {
      title: 'The Strategic Moment: Why 2024-2026 Matters',
      category: 'AI Strategy',
      excerpt: 'Understanding the window of opportunity for AI transformation...',
    },
    {
      title: 'From Confusion to Clarity: The Light Touch Approach',
      category: 'Methodology',
      excerpt: 'How we help businesses cut through the AI noise...',
    },
    {
      title: 'AI Opportunity Mapping: Finding Your Starting Point',
      category: 'Implementation',
      excerpt: 'A framework for identifying where AI can make the biggest impact...',
    },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Tag variant="premium" className="mb-4">
              Insights
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              AI Insights for{' '}
              <span className="text-radiance-gold">Business Leaders</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Practical perspectives on AI transformation. No jargon, just clarity.
            </p>
          </div>

          {/* Newsletter Capture - Primary CTA */}
          <div className="max-w-2xl mx-auto mb-16">
            <NewsletterCapture />
          </div>

          {/* Coming Soon Posts */}
          <div className="text-center mb-8">
            <Tag variant="default">Coming Soon</Tag>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoonPosts.map((post, index) => (
              <Card
                key={index}
                elevation="subtle"
                className="opacity-60 hover:opacity-80 transition-opacity"
              >
                <Tag variant="default" size="sm" className="mb-3">
                  {post.category}
                </Tag>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm">{post.excerpt}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-text-muted text-sm">
              Subscribe to be notified when new insights are published.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
