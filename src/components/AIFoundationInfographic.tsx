/**
 * AI Foundation Infographic
 *
 * Advanced visual representation of the AI Intelligence System
 * with orbital modules, particle effects, and sophisticated interactions.
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
    <div className="relative w-full max-w-6xl mx-auto py-16 flex flex-col items-center">

      {/* Main Visualization Container */}
      <div className="relative w-full max-w-[700px] aspect-square mx-auto">
        {/* Advanced SVG Layer - Behind center circle */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 700 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Radial gradient that works for all angles */}
            <radialGradient id="lineGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8B84A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E8B84A" stopOpacity="0.3" />
            </radialGradient>
            {/* Fallback solid color for better visibility */}
            <linearGradient id="lineGradientSolid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B84A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E8B84A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E8B84A" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Connection lines - Draw all 6 modules */}
          {modules.map((module, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            // Center circle is w-32 h-32 (128px = 64px radius), accounting for 1px border
            // Using 65px to ensure lines connect to the visual edge of the circle
            const innerRadius = 65;
            const outerRadius = 240;
            const x1 = 350 + Math.cos(angle) * innerRadius;
            const y1 = 350 + Math.sin(angle) * innerRadius;
            const x2 = 350 + Math.cos(angle) * outerRadius;
            const y2 = 350 + Math.sin(angle) * outerRadius;

            return (
              <line
                key={module.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E8B84A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeOpacity={activeModule === module.id ? "0.6" : "0.35"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group">

            {/* Main center sphere */}
            <div
              className="relative w-32 h-32 rounded-full flex items-center justify-center
                         bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]
                         border border-radiance-gold/60 backdrop-blur-xl
                         transition-all duration-700 group-hover:scale-105
                         group-hover:border-radiance-gold/90"
              style={{
                boxShadow: `
                  0 0 60px rgba(232, 184, 74, 0.3),
                  inset 0 0 40px rgba(232, 184, 74, 0.06),
                  inset 0 0 15px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              {/* Inner glass effect */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-radiance-gold/5 to-transparent opacity-50" />
              
              {/* Content */}
              <div className="relative flex flex-col items-center justify-center text-center gap-2 z-10">
                {/* Typography */}
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-radiance-gold uppercase tracking-[0.15em] leading-tight">
                    AI Intelligence
                  </p>
                  <p className="text-xs font-bold text-text-primary/90 uppercase tracking-[0.15em] leading-tight">
                    System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Module Cards */}
        {modules.map((module, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const radius = 43;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;

          return (
            <div
              key={module.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
              }}
              onMouseEnter={() => setActiveModule(module.id)}
              onMouseLeave={() => setActiveModule(null)}
            >
              <div
                className={`
                  relative cursor-pointer transition-all duration-500 ease-out
                  ${activeModule === module.id ? 'scale-110 z-30' : 'scale-100'}
                `}
                style={{
                  filter: activeModule && activeModule !== module.id ? 'blur(0.5px) brightness(0.8)' : 'none',
                }}
              >
                {/* Hover glow */}
                <div
                  className={`
                    absolute inset-0 -m-3 rounded-[1.5rem] blur-xl transition-all duration-300
                    ${activeModule === module.id 
                      ? 'opacity-100 bg-radiance-gold/20' 
                      : 'opacity-0'}
                  `}
                />

                {/* Glass morphism card */}
                <div
                  className={`
                    relative w-40 p-6 rounded-[1.25rem] text-center
                    bg-gradient-to-br from-depth-elevated/95 via-depth-surface/90 to-depth-elevated/95
                    backdrop-blur-xl
                    border transition-all duration-500
                    ${activeModule === module.id
                      ? 'border-radiance-gold/70 shadow-2xl'
                      : 'border-depth-border/30 hover:border-radiance-gold/40'}
                  `}
                  style={{
                    boxShadow: activeModule === module.id
                      ? '0 0 60px rgba(232, 184, 74, 0.4), inset 0 0 40px rgba(232, 184, 74, 0.05), 0 10px 40px rgba(0, 0, 0, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Inner gradient overlay */}
                  <div 
                    className={`
                      absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-radiance-gold/0 via-radiance-gold/5 to-radiance-gold/0
                      transition-opacity duration-500
                      ${activeModule === module.id ? 'opacity-100' : 'opacity-0'}
                    `}
                  />


                  {/* Icon */}
                  <div
                    className={`
                      relative mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                      transition-all duration-300
                      ${activeModule === module.id
                        ? 'bg-gradient-to-br from-radiance-gold/20 to-radiance-gold/10 text-radiance-gold scale-105'
                        : 'bg-gradient-to-br from-depth-surface/60 to-depth-base/40 text-text-secondary'}
                    `}
                    style={{
                      boxShadow: activeModule === module.id 
                        ? '0 0 20px rgba(232, 184, 74, 0.2)'
                        : 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {module.icon}
                  </div>

                  {/* Label with premium typography */}
                  <h3
                    className={`
                      relative text-sm font-bold leading-tight transition-all duration-500 mb-2.5
                      ${activeModule === module.id ? 'text-radiance-gold' : 'text-text-primary'}
                    `}
                  >
                    {module.label}
                    {activeModule === module.id && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-radiance-gold to-transparent" />
                    )}
                  </h3>

                  {/* Description with enhanced readability */}
                  <p
                    className={`
                      text-[11px] leading-relaxed transition-all duration-500
                      ${activeModule === module.id 
                        ? 'text-text-secondary opacity-100' 
                        : 'text-text-muted opacity-70'}
                    `}
                  >
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Bottom Section */}
      <div className="relative text-center mt-20 space-y-5 max-w-2xl mx-auto z-10">
        <p className="text-lg text-text-secondary leading-relaxed">
          We set up the <span className="text-radiance-gold font-bold relative inline-block">
            foundation
            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-radiance-gold/50 to-transparent" />
          </span> — then connect the modules your business needs.
        </p>
      </div>
    </div>
  );
};

export default AIFoundationInfographic;
