/**
 * AI Readiness Curve Visual
 * Simple, elegant progression visualization
 */

import React, { useState, useEffect, useRef } from 'react';

const STAGES = [
  { level: 1, label: 'Experimenting with tools', t: 0 },
  { level: 2, label: 'Automating tasks', t: 0.33 },
  { level: 3, label: 'Systematizing workflows', t: 0.67 },
  { level: 4, label: 'Owning business intelligence', t: 1 },
];

// Cubic Bezier: smooth curve from bottom-left to top-right
const getPoint = (t: number) => {
  const P0 = { x: 5, y: 85 };
  const P1 = { x: 25, y: 70 };
  const P2 = { x: 70, y: 20 };
  const P3 = { x: 95, y: 10 };
  
  const x = Math.pow(1-t, 3) * P0.x + 3 * Math.pow(1-t, 2) * t * P1.x + 
            3 * (1-t) * Math.pow(t, 2) * P2.x + Math.pow(t, 3) * P3.x;
  const y = Math.pow(1-t, 3) * P0.y + 3 * Math.pow(1-t, 2) * t * P1.y + 
            3 * (1-t) * Math.pow(t, 2) * P2.y + Math.pow(t, 3) * P3.y;
  
  return { x, y };
};

export const AIReadinessCurve: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cubic Bezier curve: start point, control point 1, control point 2, end point
  const start = getPoint(0);
  const end = getPoint(1);
  const curvePath = `M ${start.x} ${start.y} C 25 70, 70 20, ${end.x} ${end.y}`;

  return (
    <div ref={containerRef} className="relative w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Curve Container */}
        <div className="relative" style={{ height: '520px' }}>
          {/* SVG Curve */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B8682" stopOpacity="0.25" />
                <stop offset="40%" stopColor="#A8A299" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#D4944C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E8B84A" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            
            <path
              d={curvePath}
              fill="none"
              stroke="url(#curveGrad)"
              strokeWidth="0.12"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: '200',
                strokeDashoffset: isVisible ? 0 : 200,
                transition: 'stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </svg>

          {/* Stage Points */}
          {STAGES.map((stage, index) => {
            const point = getPoint(stage.t);
            const isLast = stage.level === 4;
            const delay = 800 + (index * 180); // Start after curve animation begins

            // Calculate label offset based on position to avoid overlap
            const labelOffset = index === 0 ? 28 : index === 3 ? 28 : 32;

            return (
              <div
                key={stage.level}
                className="absolute"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
                }}
              >
                {/* Dot with subtle ring for stage 4 */}
                <div className="relative">
                  <div className={`
                    w-3 h-3 rounded-full transition-all duration-700
                    ${isLast 
                      ? 'bg-radiance-gold shadow-[0_0_12px_rgba(232,184,74,0.6)]' 
                      : 'bg-text-muted/60'
                    }
                  `} />
                  {isLast && (
                    <div className="absolute inset-0 rounded-full border border-radiance-gold/30 animate-ping" 
                      style={{ animationDuration: '3s', animationIterationCount: 'infinite' }} 
                    />
                  )}
                </div>

                {/* Label */}
                <div 
                  className={`
                    absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center
                    text-xs md:text-sm leading-relaxed
                    ${isLast 
                      ? 'text-radiance-gold font-medium tracking-tight' 
                      : 'text-text-secondary font-normal tracking-normal'
                    }
                  `}
                  style={{
                    top: `${labelOffset}px`
                  }}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIReadinessCurve;
