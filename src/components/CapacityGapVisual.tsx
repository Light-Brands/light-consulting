/**
 * Interactive Capacity Gap Visualization
 * An engaging, animated infographic showing the transformation journey
 */

import React, { useState, useEffect, useRef } from 'react';

interface Stage {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  metrics: { label: string; before: string; after: string }[];
}

const STAGES: Stage[] = [
  {
    id: 'current',
    label: 'Where You Are',
    sublabel: 'Current State',
    description: 'Hidden inefficiencies, manual processes, decisions made on gut feel. Opportunities exist but remain invisible.',
    color: 'text-text-muted',
    glowColor: 'rgba(139, 134, 130, 0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    metrics: [
      { label: 'Manual Tasks', before: '65%', after: '15%' },
      { label: 'Decision Speed', before: 'Days', after: 'Minutes' },
      { label: 'Insight Depth', before: 'Surface', after: 'Deep' },
    ],
  },
  {
    id: 'bridge',
    label: 'The Bridge',
    sublabel: 'Light Consulting',
    description: 'Clarity reveals the path. We illuminate opportunities hidden in plain sight and give you the confidence to act.',
    color: 'text-radiance-gold',
    glowColor: 'rgba(232, 184, 74, 0.5)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L12 6M12 18L12 22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    metrics: [
      { label: 'Clarity', before: '→', after: '100%' },
      { label: 'Confidence', before: '→', after: 'High' },
      { label: 'Direction', before: '→', after: 'Clear' },
    ],
  },
  {
    id: 'future',
    label: 'Fullest Capacity',
    sublabel: 'Transformed State',
    description: 'AI-augmented operations, data-driven decisions, competitive advantages that compound over time.',
    color: 'text-clarity-cream',
    glowColor: 'rgba(253, 246, 227, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" opacity="0.2" />
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    metrics: [
      { label: 'Efficiency', before: '', after: '+340%' },
      { label: 'Growth', before: '', after: 'Exponential' },
      { label: 'Advantage', before: '', after: 'Compounding' },
    ],
  },
];

// Particle component for the flowing light effect
const Particle: React.FC<{ delay: number; duration: number; top: number }> = ({ delay, duration, top }) => (
  <div
    className="absolute w-2 h-2 rounded-full bg-radiance-gold/60 blur-[2px]"
    style={{
      top: `${top}%`,
      left: '-8px',
      animation: `particleFlow ${duration}s ease-in-out ${delay}s infinite`,
    }}
  />
);

export const CapacityGapVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress bar
          let currentProgress = 0;
          const interval = setInterval(() => {
            currentProgress += 2;
            setProgress(currentProgress);
            if (currentProgress >= 100) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleStageClick = (stageId: string) => {
    setActiveStage(activeStage === stageId ? null : stageId);
  };

  return (
    <div ref={containerRef} className="relative py-8">
      {/* CSS Animations */}
      <style>{`
        @keyframes particleFlow {
          0% { transform: translateX(0) scale(0); opacity: 0; }
          10% { transform: translateX(10%) scale(1); opacity: 1; }
          90% { transform: translateX(calc(100vw - 100px)) scale(1); opacity: 0.8; }
          100% { transform: translateX(calc(100vw - 50px)) scale(0); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color); }
          50% { box-shadow: 0 0 30px var(--glow-color), 0 0 60px var(--glow-color); }
        }
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .stage-node {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stage-node:hover {
          transform: scale(1.1);
        }
        .stage-node.active {
          transform: scale(1.15);
        }
        .detail-panel {
          animation: slideUp 0.4s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Particle layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isVisible && Array.from({ length: 8 }).map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 0.8} 
            duration={4 + Math.random() * 2}
            top={35 + Math.random() * 30}
          />
        ))}
      </div>

      {/* Main visualization */}
      <div className="relative">
        {/* Progress track background */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-depth-border rounded-full -translate-y-1/2" />
        
        {/* Animated progress fill */}
        <div 
          className="absolute top-1/2 left-[10%] h-1 rounded-full -translate-y-1/2 transition-all duration-100"
          style={{
            width: `${progress * 0.8}%`,
            background: 'linear-gradient(90deg, rgba(139,134,130,0.5) 0%, #E8B84A 50%, #FDF6E3 100%)',
            boxShadow: '0 0 20px rgba(232, 184, 74, 0.5)',
          }}
        />

        {/* Connection lines with glow */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 134, 130, 0.3)" />
              <stop offset="100%" stopColor="rgba(232, 184, 74, 0.6)" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(232, 184, 74, 0.6)" />
              <stop offset="100%" stopColor="rgba(253, 246, 227, 0.5)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Stage nodes */}
        <div className="relative flex justify-between items-center px-[5%] md:px-[10%] py-12">
          {STAGES.map((stage, index) => {
            const isActive = activeStage === stage.id;
            const stageProgress = progress > (index * 50) ? Math.min(100, (progress - index * 50) * 2) : 0;
            
            return (
              <div 
                key={stage.id} 
                className="relative flex flex-col items-center"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.2}s`,
                }}
              >
                {/* Node circle */}
                <button
                  onClick={() => handleStageClick(stage.id)}
                  className={`stage-node relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer border-2 ${isActive ? 'active' : ''}`}
                  style={{
                    background: index === 0 
                      ? 'linear-gradient(135deg, rgba(30,28,26,1) 0%, rgba(45,42,39,1) 100%)'
                      : index === 1
                      ? 'linear-gradient(135deg, rgba(232, 184, 74, 0.2) 0%, rgba(212, 148, 76, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(253, 246, 227, 0.1) 0%, rgba(253, 246, 227, 0.2) 100%)',
                    borderColor: index === 0 
                      ? 'rgba(139, 134, 130, 0.5)' 
                      : index === 1 
                      ? 'rgba(232, 184, 74, 0.8)' 
                      : 'rgba(253, 246, 227, 0.6)',
                    boxShadow: isActive ? `0 0 30px ${stage.glowColor}, 0 0 60px ${stage.glowColor}` : `0 0 15px ${stage.glowColor}`,
                    animation: index === 1 && isVisible ? 'float-subtle 3s ease-in-out infinite' : 'none',
                  }}
                >
                  {/* Progress ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke={index === 1 ? '#E8B84A' : index === 2 ? '#FDF6E3' : '#8B8682'}
                      strokeWidth="2"
                      strokeDasharray={`${stageProgress * 2.83} 283`}
                      opacity="0.6"
                    />
                  </svg>
                  
                  {/* Icon */}
                  <div className={`${stage.color} z-10`}>
                    {stage.icon}
                  </div>

                  {/* Pulse effect for middle node */}
                  {index === 1 && isVisible && (
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(232, 184, 74, 0.3) 0%, transparent 70%)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                        '--glow-color': 'rgba(232, 184, 74, 0.3)',
                      } as React.CSSProperties}
                    />
                  )}
                </button>

                {/* Labels */}
                <div className="mt-4 text-center">
                  <p className={`font-semibold text-sm md:text-base ${stage.color}`}>
                    {stage.label}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {stage.sublabel}
                  </p>
                </div>

                {/* Expanded detail panel */}
                {isActive && (
                  <div 
                    className="detail-panel absolute top-full mt-6 w-64 md:w-80 p-5 rounded-xl shadow-2xl z-20 border border-radiance-gold/30" 
                    style={{ 
                      backgroundColor: '#0F0E0D',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 30px rgba(232, 184, 74, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)' 
                    }}
                  >
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {stage.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="space-y-2">
                      {stage.metrics.map((metric, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg"
                          style={{ backgroundColor: '#0A0908' }}
                        >
                          <span className="text-text-muted text-xs">{metric.label}</span>
                          <div className="flex items-center gap-2">
                            {metric.before && (
                              <>
                                <span className="text-text-muted text-xs line-through opacity-60">{metric.before}</span>
                                <svg className="w-3 h-3 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                            <span className={`text-sm font-bold ${stage.color}`}>{metric.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Arrow pointer */}
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border-l border-t border-radiance-gold/30 rotate-45" 
                      style={{ backgroundColor: '#0F0E0D' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive hint */}
        <p className="text-center text-text-muted text-xs mt-4 animate-pulse">
          ✨ Click each stage to explore the transformation
        </p>
      </div>

      {/* Bottom stats bar */}
      <div 
        className="mt-8 grid grid-cols-3 gap-4 p-4 bg-depth-base/50 rounded-xl border border-depth-border"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.8s',
        }}
      >
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-black text-radiance-gold">90</div>
          <div className="text-text-muted text-xs">Minutes to Clarity</div>
        </div>
        <div className="text-center border-x border-depth-border">
          <div className="text-2xl md:text-3xl font-black text-radiance-amber">3-5</div>
          <div className="text-text-muted text-xs">AI Opportunities</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-black text-clarity-cream">∞</div>
          <div className="text-text-muted text-xs">Compounding Value</div>
        </div>
      </div>
    </div>
  );
};

export default CapacityGapVisual;

