/**
 * Interactive Capacity Gap Visualization
 * A technical, blueprint-inspired interactive component showing the transformation
 */

import React, { useState, useRef, useEffect } from 'react';

interface Metric {
  label: string;
  before: string;
  after: string;
  unit?: string;
}

const METRICS: Metric[] = [
  { label: 'PROCESS LATENCY', before: '72', after: '4', unit: 'hrs' },
  { label: 'OPERATIONAL LEVERAGE', before: '1.2', after: '8.5', unit: 'x' },
  { label: 'DATA VISIBILITY', before: '15', after: '98', unit: '%' },
  { label: 'DECISION SPEED', before: 'Days', after: 'Secs' },
];

export const CapacityGapVisual: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Intersection observer for visibility animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle slider drag
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setIsInteracting(value > 0 && value < 100);
  };

  const handleSliderMouseDown = () => {
    setIsInteracting(true);
  };

  const handleSliderMouseUp = () => {
    setIsInteracting(false);
  };

  // Calculate interpolation
  const interpolate = (start: number, end: number, progress: number) => {
    return start + (end - start) * progress;
  };

  // Use green when at 100%, gold otherwise
  const isComplete = sliderValue === 100;
  const primaryColor = isComplete ? 'success' : 'radiance-gold';
  const primaryColorHex = isComplete ? '#5CB85C' : '#E8B84A';

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-12 px-4 select-none transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, ${primaryColorHex} 1px, transparent 1px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header / Status Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-depth-border pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${sliderValue > 0 ? (isComplete ? 'bg-success animate-pulse' : 'bg-radiance-gold animate-pulse') : 'bg-text-muted'}`} />
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">System Diagnostics::Gap_Analysis</span>
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-text-primary">
              The Bridge <span className={isComplete ? 'text-success' : 'text-radiance-gold'}>Efficiency</span>
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-[10px] font-mono text-text-muted mb-1">TRANSFORMATION_PHASE</div>
            <div className={`text-sm font-mono ${isComplete ? 'text-success' : 'text-radiance-gold'}`}>
              [{sliderValue === 0 ? 'STATIC' : sliderValue === 100 ? 'OPTIMIZED' : 'BRIDGING'}] {sliderValue}%
            </div>
          </div>
        </div>

        {/* Comparison Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Left Side: The "As-Is" */}
          <div className={`space-y-6 transition-all duration-700 ${sliderValue > 50 ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-text-muted tracking-tighter">REF::STATE_01</span>
              <span className="px-2 py-0.5 rounded border border-depth-border text-[9px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">Manual Legacy</span>
            </div>
            <div className="p-6 rounded-xl border border-depth-border bg-depth-elevated/50 backdrop-blur-sm relative overflow-hidden group/card hover:border-text-muted/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 blur-3xl" />
              <div className="space-y-5 relative z-10">
                {METRICS.map((metric, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-mono text-text-muted uppercase tracking-wider">
                      <span>{metric.label}</span>
                      <span className="text-text-secondary">{metric.before}{metric.unit}</span>
                    </div>
                    <div className="h-1 w-full bg-depth-base rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-text-muted/30 transition-all duration-1000" 
                        style={{ width: `${30 + (i * 10)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: The "To-Be" */}
          <div className={`space-y-6 transition-all duration-700 ${sliderValue < 50 ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono ${isComplete ? 'text-success' : 'text-radiance-gold'} tracking-tighter`}>REF::STATE_02</span>
              <span className={`px-2 py-0.5 rounded border ${isComplete ? 'border-success/30 text-success bg-success/5' : 'border-radiance-gold/30 text-radiance-gold bg-radiance-gold/5'} text-[9px] font-mono uppercase tracking-wider`}>Augmented Intelligence</span>
            </div>
            <div 
              className={`p-6 rounded-xl border backdrop-blur-sm relative overflow-hidden group/card transition-colors ${isComplete ? 'border-success/20 bg-success/5 hover:border-success/40' : 'border-radiance-gold/20 bg-radiance-gold/5 hover:border-radiance-gold/40'}`}
              style={{ boxShadow: `0 0 30px ${primaryColorHex}0D` }}
            >
              <div 
                className="absolute inset-0 bg-radial-gradient to-transparent opacity-50"
                style={{ backgroundImage: `radial-gradient(circle, ${primaryColorHex}1A, transparent)` }}
              />
              <div className="space-y-5 relative z-10">
                {METRICS.map((metric, i) => (
                  <div key={i} className="space-y-2">
                    <div className={`flex justify-between text-[9px] font-mono uppercase tracking-wider ${isComplete ? 'text-success/70' : 'text-radiance-gold/70'}`}>
                      <span>{metric.label}</span>
                      <span className="text-text-primary font-bold">{metric.after}{metric.unit}</span>
                    </div>
                    <div className="h-1 w-full bg-depth-base rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${isComplete ? 'bg-success' : 'bg-radiance-gold'}`}
                        style={{ 
                          width: `${85 + (i * 3)}%`,
                          boxShadow: `0 0 10px ${primaryColorHex}99`
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scrubber Section */}
        <div className="relative pt-12">
          {/* Connecting Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-depth-border to-transparent" />
          
          <div className="flex flex-col items-center gap-8">
            <div className="text-center space-y-3">
              <div className="text-[9px] font-mono text-text-muted tracking-[0.4em] uppercase">Manual Control / Bridge Scrubber</div>
              <p className="text-sm text-text-secondary italic font-light tracking-wide">Drag to bridge the capacity gap</p>
            </div>

            {/* The Scrubber */}
            <div className="relative w-full max-w-2xl h-16 flex items-center group/scrubber">
              {/* Track */}
              <div className="absolute inset-x-0 h-[1px] bg-depth-border" />
              
              {/* Active Track */}
              <div 
                className={`absolute left-0 h-[1px] transition-all duration-100 ${isComplete ? 'bg-success' : 'bg-radiance-gold'}`}
                style={{ 
                  width: `${sliderValue}%`,
                  boxShadow: `0 0 15px ${primaryColorHex}CC`
                }}
              />

              {/* Hidden Range Input for dragging */}
              <input
                ref={sliderRef}
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                onTouchStart={handleSliderMouseDown}
                onTouchEnd={handleSliderMouseUp}
                className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-30"
                style={{ WebkitAppearance: 'none', appearance: 'none' }}
              />

              {/* Custom Handle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-100"
                style={{ left: `${sliderValue}%` }}
              >
                <div 
                  className={`
                    w-10 h-10 rounded-full border-2 bg-depth-base flex items-center justify-center transition-all duration-500
                    ${isInteracting ? `scale-110 ${isComplete ? 'border-success' : 'border-radiance-gold'}` : `border-depth-border ${isComplete ? 'group-hover/scrubber:border-success/50' : 'group-hover/scrubber:border-radiance-gold/50'}`}
                  `}
                  style={isInteracting ? {
                    boxShadow: `0 0 30px ${primaryColorHex}4D`
                  } : {}}
                >
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${isInteracting ? (isComplete ? 'bg-success' : 'bg-radiance-gold') : 'bg-text-muted'}`}
                    style={isInteracting ? {
                      boxShadow: `0 0 10px ${primaryColorHex}`
                    } : {}}
                  />
                  
                  {/* Handle accents */}
                  <div className={`absolute -inset-2 rounded-full border animate-spin-slow opacity-0 group-hover/scrubber:opacity-100 transition-opacity ${isComplete ? 'border-success/10' : 'border-radiance-gold/10'}`} />
                </div>
                
                {/* Value tooltip */}
                <div className={`
                  absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md bg-depth-surface font-bold transition-all duration-300 backdrop-blur-md shadow-xl
                  ${isComplete ? 'border-success/30 text-success' : 'border-radiance-gold/30 text-radiance-gold'} border text-[11px] font-mono
                  ${isHovered || isInteracting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                `}>
                  {sliderValue}%_COMPLETE
                </div>
              </div>

              {/* Tick Marks */}
              <div className="absolute inset-x-0 -bottom-6 flex justify-between px-2">
                {[0, 25, 50, 75, 100].map((tick) => (
                  <div key={tick} className="flex flex-col items-center gap-2">
                    <div className={`w-[1px] h-2 transition-colors duration-500 ${sliderValue >= tick ? (isComplete ? 'bg-success' : 'bg-radiance-gold') : 'bg-depth-border'}`} />
                    <span className={`text-[8px] font-mono tracking-tighter transition-colors duration-500 ${sliderValue >= tick ? (isComplete ? 'text-success' : 'text-radiance-gold') : 'text-text-muted'}`}>
                      {tick === 0 ? 'START' : tick === 100 ? 'PEAK' : `${tick}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transformation Insights (Dynamic based on slider) */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { 
              label: 'Efficiency Gain', 
              value: `${Math.round(interpolate(1, 340, sliderValue / 100))}%`, 
              sub: `+${(sliderValue * 3.4).toFixed(1)}% compounding`,
              tag: 'EFF_LEVERAGE'
            },
            { 
              label: 'Decision Latency', 
              value: sliderValue < 85 ? 'DAYS' : 'SECS', 
              sub: `-${sliderValue}% friction`,
              tag: 'PROC_VELOCITY'
            },
            { 
              label: 'Competitive Moat', 
              value: sliderValue < 30 ? 'LOW' : sliderValue < 70 ? 'MEDIUM' : 'STRUCTURAL', 
              sub: `Scale phase ${Math.floor(sliderValue / 25) + 1}`,
              tag: 'MKT_DOMINANCE'
            }
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-xl border border-depth-border bg-depth-elevated/30 flex flex-col items-center text-center group/insight transition-all ${isComplete ? 'hover:border-success/30' : 'hover:border-radiance-gold/30'} hover:bg-depth-elevated/50`}>
              <div className="text-[8px] font-mono text-text-muted mb-3 uppercase tracking-[0.2em]">{item.label}</div>
              <div className={`text-2xl font-medium text-text-primary mb-1 tracking-tight transition-colors ${isComplete ? 'group-hover/insight:text-success' : 'group-hover/insight:text-radiance-gold'}`}>
                {item.value}
              </div>
              <div className={`text-[9px] font-mono tracking-wide uppercase mb-3 ${isComplete ? 'text-success/50' : 'text-radiance-gold/50'}`}>
                {item.sub}
              </div>
              <div className="mt-auto px-2 py-0.5 rounded bg-depth-base border border-depth-border text-[7px] font-mono text-text-muted">
                {item.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Text */}
        <div className="mt-16 pt-8 border-t border-depth-border/50 text-center">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="opacity-40">//</span>
            <span>INTEGRATION STATUS:</span>
            <span className={`transition-colors duration-500 ${isComplete ? 'text-success font-bold' : 'text-radiance-gold'}`}>
              {sliderValue === 100 ? 'SYSTEM_OPTIMIZED' : sliderValue > 0 ? 'DEPLOYMENT_IN_PROGRESS' : 'IDLE_WAITING_FOR_INPUT'}
            </span>
            <span className="opacity-40">//</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CapacityGapVisual;
