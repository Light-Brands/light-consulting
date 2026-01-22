'use client';

/**
 * Case Study: Growth Mastery
 * From Zero Code to Enterprise Platform in Months
 * Light Brand Consulting
 */

import { useState } from 'react';

// Development metrics - the core story
const METRICS = [
  { label: 'Lines of Code', value: '370K+', description: 'Production source code' },
  { label: 'Source Files', value: '1,327', description: 'Organized, maintainable' },
  { label: 'Time to Build', value: 'Months', description: 'Not years, not decades' },
  { label: 'Prior Experience', value: 'Zero', description: 'Never coded before' },
];

// Timeline comparison data
const TIMELINE_COMPARISON = [
  {
    scenario: 'Single Developer',
    calculation: '370,000 lines / 3,000 per month',
    result: '~10 Years',
    description: 'At industry average of 3,000 lines/month for a senior full-stack developer',
  },
  {
    scenario: 'Team of 5 Developers',
    calculation: '370,000 lines / 15,000 per month',
    result: '~2 Years',
    description: 'Five developers working full-time, coordinating across the codebase',
  },
  {
    scenario: 'Growth Mastery + Light Consulting',
    calculation: 'AI-powered development systems',
    result: 'Months',
    description: 'Zero coding experience to enterprise platform with our guidance',
  },
];

// Tech stack breakdown
const TECH_BREAKDOWN = [
  { type: 'TypeScript (.ts)', files: 809, lines: 218885, percentage: 59 },
  { type: 'TypeScript React (.tsx)', files: 441, lines: 124392, percentage: 34 },
  { type: 'JavaScript (.js)', files: 7, lines: 10781, percentage: 3 },
  { type: 'CSS/SCSS', files: 5, lines: 5850, percentage: 2 },
  { type: 'SQL', files: 65, lines: 9729, percentage: 2 },
];

// Key achievements
const ACHIEVEMENTS = [
  {
    title: 'Enterprise Architecture',
    description:
      'A fully-typed TypeScript codebase with 93% type coverage. Clean separation of concerns, modular components, and maintainable code structure that rivals teams of senior engineers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Modern Tech Stack',
    description:
      'Built on Next.js and React, the same technologies powering Netflix, TikTok, and Notion. Production-ready infrastructure that scales from day one.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Database & Backend',
    description:
      '65 SQL files comprising nearly 10,000 lines of database logic. Complex queries, migrations, and data models that would typically require dedicated backend engineers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: 'Component Library',
    description:
      '441 React components creating a rich, interactive user experience. Reusable, tested, and following industry best practices for UI development.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'Documentation',
    description:
      'Over 83,000 lines of markdown documentation including AI agent configurations and comprehensive system guides. A codebase that explains itself.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Production Ready',
    description:
      'Not a prototype or proof of concept. A fully functional, deployed platform handling real users and real business operations from day one.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// The transformation story
const TRANSFORMATION_STORY = [
  {
    phase: 'The Starting Point',
    title: 'Zero Coding Experience',
    description:
      'The Growth Mastery founder came to us with a vision but no technical background. No programming courses, no bootcamps, no prior development experience whatsoever. Just ambition and the right partnership.',
  },
  {
    phase: 'The Approach',
    title: 'AI-Powered Development Systems',
    description:
      'We equipped them with our proprietary AI development methodology and guidance framework. This isn\'t about writing code for clients\u2014it\'s about empowering them with systems that multiply their capabilities exponentially.',
  },
  {
    phase: 'The Execution',
    title: 'Rapid, Iterative Building',
    description:
      'Week after week, the platform grew. Complex features that would stump junior developers were implemented correctly. Architecture decisions that typically require years of experience were made with confidence.',
  },
  {
    phase: 'The Result',
    title: 'Enterprise-Grade Platform',
    description:
      'A codebase that stands up to professional scrutiny. Type-safe, well-organized, and maintainable. The kind of software that agencies charge six figures to build\u2014created by someone who had never written a line of code.',
  },
];

export default function GrowthMasteryCaseStudy() {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown'>('overview');

  // Calculate total for percentage display
  const totalLines = TECH_BREAKDOWN.reduce((acc, item) => acc + item.lines, 0);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-depth-base via-depth-elevated to-depth-base" />
        <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

        <div className="container-wide relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 text-radiance-gold text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Case Study
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-text-primary mb-6">
            From Zero Code to
            <br />
            <span className="text-gradient-illumination">370,000 Lines in Months</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-8">
            How Growth Mastery built an enterprise platform that would take a traditional development
            team years to complete\u2014with zero prior coding experience and Light Consulting&apos;s
            AI-powered systems.
          </p>

          {/* Client Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Client:</span>
              <span>Growth Mastery</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-depth-border" />
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Industry:</span>
              <span>Technology / SaaS</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-depth-border" />
            <div className="flex items-center gap-2">
              <span className="text-radiance-gold">Stack:</span>
              <span>Next.js + React + TypeScript</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-depth-elevated border-y border-depth-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-radiance-gold mb-2">
                  {metric.value}
                </div>
                <div className="text-text-primary font-semibold mb-1">{metric.label}</div>
                <div className="text-text-muted text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impossible Math Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
              The <span className="text-radiance-gold">Impossible</span> Math
            </h2>
            <p className="text-xl text-text-secondary text-center mb-12">
              Industry data shows that a proficient full-stack developer writes between 2,000 to 4,000
              lines of quality, production-ready code per month. Let&apos;s do the math.
            </p>

            {/* Timeline Comparison Cards */}
            <div className="space-y-6">
              {TIMELINE_COMPARISON.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-6 md:p-8 transition-all ${
                    index === 2
                      ? 'bg-radiance-gold/10 border-radiance-gold/50'
                      : 'bg-depth-elevated border-depth-border'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-text-muted text-sm uppercase tracking-wider mb-1">
                        {item.scenario}
                      </div>
                      <div className="text-text-secondary mb-2">{item.description}</div>
                      <div className="text-text-muted text-sm font-mono">{item.calculation}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-4xl md:text-5xl font-bold ${
                          index === 2 ? 'text-radiance-gold' : 'text-text-primary'
                        }`}
                      >
                        {item.result}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emphasis callout */}
            <div className="mt-12 text-center">
              <p className="text-2xl md:text-3xl font-bold text-text-primary">
                What takes a <span className="text-error">decade</span> for one developer,
                <br />
                or <span className="text-error">two years</span> for a team of five...
              </p>
              <p className="text-2xl md:text-3xl font-bold text-radiance-gold mt-4">
                Was accomplished in <span className="underline decoration-radiance-gold">months</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Breakdown Section */}
      <section className="py-16 bg-depth-elevated border-y border-depth-border">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">
              Codebase <span className="text-radiance-gold">Breakdown</span>
            </h2>

            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-radiance-gold text-depth-base'
                    : 'bg-depth-base border border-depth-border text-text-muted hover:text-text-primary'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('breakdown')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'breakdown'
                    ? 'bg-radiance-gold text-depth-base'
                    : 'bg-depth-base border border-depth-border text-text-muted hover:text-text-primary'
                }`}
              >
                Detailed Breakdown
              </button>
            </div>

            {activeTab === 'overview' ? (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Source Code */}
                <div className="bg-depth-base rounded-xl border border-depth-border p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Source Code</h3>
                  <div className="text-4xl font-bold text-radiance-gold mb-2">369,637</div>
                  <div className="text-text-muted mb-4">lines across 1,327 files</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>TypeScript/TSX</span>
                      <span className="text-radiance-gold">93%</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>JavaScript</span>
                      <span>3%</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>CSS/SQL/Other</span>
                      <span>4%</span>
                    </div>
                  </div>
                </div>

                {/* Additional Content */}
                <div className="bg-depth-base rounded-xl border border-depth-border p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-4">Documentation</h3>
                  <div className="text-4xl font-bold text-radiance-gold mb-2">84,430</div>
                  <div className="text-text-muted mb-4">lines of documentation</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Markdown (.md)</span>
                      <span>83,783 lines</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>JSON Config</span>
                      <span>647 lines</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>AI Agent Configs</span>
                      <span>Included</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {TECH_BREAKDOWN.map((item, index) => (
                  <div
                    key={index}
                    className="bg-depth-base rounded-xl border border-depth-border p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <div className="font-semibold text-text-primary">{item.type}</div>
                      <div className="text-text-muted text-sm">
                        {item.files} files &middot; {item.lines.toLocaleString()} lines
                      </div>
                    </div>
                    <div className="relative h-3 bg-depth-elevated rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-radiance-gold to-radiance-amber rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-radiance-gold mt-1">
                      {item.percentage}%
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="bg-radiance-gold/10 rounded-xl border border-radiance-gold/30 p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-text-primary">Source Code Total</div>
                    <div className="text-xl font-bold text-radiance-gold">
                      {totalLines.toLocaleString()} lines
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center">
              The <span className="text-radiance-gold">Transformation</span> Story
            </h2>

            <div className="space-y-8">
              {TRANSFORMATION_STORY.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 md:gap-8"
                >
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 flex items-center justify-center text-radiance-gold font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    {index < TRANSFORMATION_STORY.length - 1 && (
                      <div className="w-px h-full bg-depth-border mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="text-radiance-gold text-sm font-medium uppercase tracking-wider mb-1">
                      {item.phase}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Was Built Section */}
      <section className="py-16 bg-depth-elevated border-y border-depth-border">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">
              What Was <span className="text-radiance-gold">Built</span>
            </h2>
            <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
              This isn&apos;t a simple landing page or basic CRUD app. This is enterprise-grade software
              with professional architecture.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-depth-base rounded-xl border border-depth-border p-6 hover:border-radiance-gold/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-radiance-gold/10 border border-radiance-gold/30 flex items-center justify-center text-radiance-gold mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{achievement.title}</h3>
                  <p className="text-text-muted text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <svg
              className="w-12 h-12 text-radiance-gold/30 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed mb-6">
              &ldquo;The traditional rules of software development no longer apply. With the right
              AI-powered systems and guidance, a single determined individual can build what used to
              require entire engineering teams and years of development time.&rdquo;
            </blockquote>
            <div className="text-radiance-gold font-semibold">Light Brand Consulting</div>
          </div>
        </div>
      </section>

      {/* The Implications Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
              What This <span className="text-radiance-gold">Means</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-depth-elevated rounded-xl border border-depth-border p-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">For Entrepreneurs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      Technical co-founders are no longer mandatory
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      Six-figure development budgets can be avoided
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      Years of waiting can become months of building
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      You maintain ownership and understanding of your codebase
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-depth-elevated rounded-xl border border-depth-border p-8">
                <h3 className="text-xl font-bold text-text-primary mb-4">For The Industry</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      The barrier to entry for software creation is dissolving
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      Quality no longer requires large teams
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      Speed and quality are no longer trade-offs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-radiance-gold mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-text-secondary">
                      The right methodology matters more than headcount
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-depth-elevated border-t border-depth-border">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Ready to Build <span className="text-radiance-gold">Your Platform</span>?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Whether you have an idea that&apos;s been waiting for the right moment, or you&apos;re ready to
              transform your existing business with custom software, our AI-powered systems and
              guidance can get you there faster than you ever thought possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors"
              >
                Book a Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-radiance-gold/50 text-radiance-gold font-semibold rounded-lg hover:bg-radiance-gold/10 transition-colors"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Footer */}
      <section className="py-12 border-t border-depth-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-text-muted">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">454,000+</div>
              <div className="text-sm">Total Lines</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-depth-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">1,327</div>
              <div className="text-sm">Source Files</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-depth-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">93%</div>
              <div className="text-sm">TypeScript</div>
            </div>
            <div className="hidden md:block w-px h-8 bg-depth-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-radiance-gold">Months</div>
              <div className="text-sm">Not Years</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
