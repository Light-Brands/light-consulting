/**
 * AI Foundation Infographic
 *
 * Visual representation of the AI Super Intelligence System
 * with connected modules orbiting around the central core.
 */

'use client';

import React, { useState } from 'react';

interface Module {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const modules: Module[] = [
  {
    id: 'automation',
    label: 'Automation Engine',
    description: 'Removes operational drag',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'personalization',
    label: 'Personalization Layer',
    description: 'Adaptive customer journeys',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'decisions',
    label: 'Decision Intelligence',
    description: 'Smarter choices over time',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'growth',
    label: 'Growth Systems',
    description: 'Scale without complexity',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'data',
    label: 'Data Integration',
    description: 'Unified intelligence layer',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    id: 'customer',
    label: 'Customer Intelligence',
    description: 'Deep behavioral insights',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export const AIFoundationInfographic: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(232, 184, 74, 0.15) 0%, transparent 70%),
            linear-gradient(rgba(232, 184, 74, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 184, 74, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* SVG Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for connection lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8B84A" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#E8B84A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E8B84A" stopOpacity="0.1" />
          </linearGradient>

          {/* Animated pulse */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines from center to each module */}
        {modules.map((module, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const innerRadius = 60;
          const outerRadius = 150;
          const x1 = 200 + Math.cos(angle) * innerRadius;
          const y1 = 200 + Math.sin(angle) * innerRadius;
          const x2 = 200 + Math.cos(angle) * outerRadius;
          const y2 = 200 + Math.sin(angle) * outerRadius;

          return (
            <g key={module.id}>
              {/* Base line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className={`transition-all duration-300 ${
                  activeModule === module.id ? 'opacity-100' : 'opacity-40'
                }`}
              />

              {/* Animated pulse dot */}
              <circle
                r="3"
                fill="#E8B84A"
                filter="url(#glow)"
                className={activeModule === module.id ? 'opacity-100' : 'opacity-60'}
              >
                <animateMotion
                  dur={`${2 + index * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${x1},${y1} L${x2},${y2}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Center glow ring */}
        <circle
          cx="200"
          cy="200"
          r="55"
          fill="none"
          stroke="#E8B84A"
          strokeWidth="1"
          opacity="0.3"
          className="animate-pulse"
        />
        <circle
          cx="200"
          cy="200"
          r="65"
          fill="none"
          stroke="#E8B84A"
          strokeWidth="0.5"
          opacity="0.15"
        />
      </svg>

      {/* Main Container */}
      <div className="relative aspect-square max-w-[500px] mx-auto">

        {/* Center Node - AI Super Intelligence System */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group">
            {/* Outer glow rings */}
            <div className="absolute inset-0 -m-4 rounded-full bg-radiance-gold/10 blur-xl animate-pulse" />
            <div className="absolute inset-0 -m-2 rounded-full bg-radiance-gold/5 blur-md" />

            {/* Main center node */}
            <div
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center
                         bg-gradient-to-br from-depth-elevated via-depth-surface to-depth-base
                         border-2 border-radiance-gold/50 shadow-2xl
                         transition-all duration-500 hover:border-radiance-gold hover:scale-105"
              style={{
                boxShadow: '0 0 60px rgba(232, 184, 74, 0.3), inset 0 0 30px rgba(232, 184, 74, 0.1)',
              }}
            >
              {/* Inner content */}
              <div className="text-center px-3">
                {/* AI Brain Icon */}
                <div className="mx-auto mb-2 w-10 h-10 md:w-12 md:h-12 text-radiance-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <p className="text-[10px] md:text-xs font-bold text-radiance-gold uppercase tracking-wider leading-tight">
                  AI Super
                </p>
                <p className="text-[10px] md:text-xs font-bold text-radiance-gold uppercase tracking-wider leading-tight">
                  Intelligence
                </p>
                <p className="text-[10px] md:text-xs font-bold text-text-primary uppercase tracking-wider leading-tight">
                  System
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Module Nodes */}
        {modules.map((module, index) => {
          // Position each module in a circle around the center
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const radius = 42; // percentage from center
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;

          return (
            <div
              key={module.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setActiveModule(module.id)}
              onMouseLeave={() => setActiveModule(null)}
            >
              <div
                className={`
                  relative group cursor-pointer transition-all duration-300
                  ${activeModule === module.id ? 'scale-110' : 'scale-100'}
                `}
              >
                {/* Module glow on hover */}
                <div
                  className={`
                    absolute inset-0 -m-2 rounded-xl blur-md transition-opacity duration-300
                    ${activeModule === module.id ? 'opacity-100 bg-radiance-gold/20' : 'opacity-0'}
                  `}
                />

                {/* Module card */}
                <div
                  className={`
                    relative w-24 md:w-28 p-3 rounded-xl text-center
                    bg-depth-elevated/90 backdrop-blur-sm
                    border transition-all duration-300
                    ${activeModule === module.id
                      ? 'border-radiance-gold/60 shadow-lg'
                      : 'border-depth-border hover:border-radiance-gold/30'}
                  `}
                  style={{
                    boxShadow: activeModule === module.id
                      ? '0 0 30px rgba(232, 184, 74, 0.2)'
                      : 'none',
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`
                      mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2
                      transition-colors duration-300
                      ${activeModule === module.id
                        ? 'bg-radiance-gold/20 text-radiance-gold'
                        : 'bg-depth-surface text-text-secondary'}
                    `}
                  >
                    {module.icon}
                  </div>

                  {/* Label */}
                  <p
                    className={`
                      text-[10px] md:text-xs font-semibold leading-tight transition-colors duration-300
                      ${activeModule === module.id ? 'text-radiance-gold' : 'text-text-primary'}
                    `}
                  >
                    {module.label}
                  </p>

                  {/* Description - only visible on hover */}
                  <p
                    className={`
                      text-[9px] md:text-[10px] text-text-muted mt-1 leading-tight
                      transition-all duration-300
                      ${activeModule === module.id ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'}
                    `}
                  >
                    {module.description}
                  </p>
                </div>

                {/* Connection indicator dot */}
                <div
                  className={`
                    absolute w-2 h-2 rounded-full bg-radiance-gold
                    transition-all duration-300
                    ${activeModule === module.id ? 'opacity-100 scale-100' : 'opacity-50 scale-75'}
                  `}
                  style={{
                    // Position the dot on the side facing the center
                    left: x > 50 ? '-4px' : 'auto',
                    right: x <= 50 ? '-4px' : 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div className="text-center mt-8 space-y-2">
        <p className="text-sm text-text-muted">
          We set up the <span className="text-radiance-gold font-medium">foundation</span> —
          then connect the modules your business needs.
        </p>
        <p className="text-xs text-text-muted/70">
          Hover over each module to explore
        </p>
      </div>
    </div>
  );
};

export default AIFoundationInfographic;
