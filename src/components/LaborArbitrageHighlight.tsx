/**
 * Labor Arbitrage Highlight Component
 * CONCEPT: "The Economy Compiler"
 * A technical, development-inspired visualization of refactoring human labor into intelligence.
 */

import React, { useState, useRef, useEffect } from 'react';

interface TaskLine {
  id: string;
  label: string;
  cost: string;
  type: 'manual' | 'optimized';
}

const LEGACY_TASKS: TaskLine[] = [
  { id: 't1', label: 'MANUAL_INQUIRY_TRIAGE', cost: '$45/hr', type: 'manual' },
  { id: 't2', label: 'DATA_ENTRY_VALIDATION', cost: '$32/hr', type: 'manual' },
  { id: 't3', label: 'CLIENT_REPORT_COMPILATION', cost: '$120/hr', type: 'manual' },
  { id: 't4', label: 'CONTENT_DRAFTING_V1', cost: '$85/hr', type: 'manual' },
  { id: 't5', label: 'PROCESS_COORDINATION', cost: '$150/hr', type: 'manual' },
  { id: 't6', label: 'QUALITY_ASSURANCE_CHECK', cost: '$90/hr', type: 'manual' },
];

export const LaborArbitrageHighlight: React.FC<{ onLearnMore: () => void }> = ({ onLearnMore }) => {
  const [isRefactored, setIsRefactored] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLines, setActiveLines] = useState<TaskLine[]>(LEGACY_TASKS);
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

  const handleRefactor = () => {
    if (isRefactored) {
      setActiveLines(LEGACY_TASKS);
      setIsRefactored(false);
    } else {
      setIsRefactored(true);
      // Simulate "compiling"
      setTimeout(() => {
        setActiveLines([{ id: 'opt', label: 'SYSTEM.INTELLIGENCE_ENGINE(v2.0)', cost: '$0.02/req', type: 'optimized' }]);
      }, 300);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-12 px-6 md:px-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {/* Pulse glow animation */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 16px rgba(232, 184, 74, 0.25);
          }
          50% {
            box-shadow: 0 0 24px rgba(232, 184, 74, 0.4);
          }
        }
      `}</style>
      
      {/* Blueprint background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isRefactored ? 'bg-success' : 'bg-error animate-pulse'}`} />
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Economy_Module::Cost_Structure</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-medium text-text-primary">
              The End of <span className="text-error">Labor Arbitrage</span>
            </h3>
            <p className="text-text-secondary max-w-xl text-lg font-light leading-relaxed">
              Old business models mark up labor. New models own intelligence. We help you refactor the unit economics of your operation.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="text-[10px] font-mono text-text-muted">SYSTEM_STATUS</div>
            <div className={`text-sm font-mono px-3 py-1 rounded border transition-colors duration-500 ${isRefactored ? 'text-success border-success/30 bg-success/5' : 'text-error border-error/30 bg-error/5'}`}>
              {isRefactored ? 'OPTIMIZED_ENGINE' : 'LEGACY_LABOR_STACK'}
            </div>
          </div>
        </div>

        {/* The Compiler Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Terminal / Code Editor */}
          <div className="lg:col-span-7">
            <div className="bg-depth-elevated border border-depth-border rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Terminal Title Bar */}
              <div className="bg-depth-surface/50 border-b border-depth-border px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-radiance-gold/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
                </div>
                <div className="text-[10px] font-mono text-text-muted">business_model.tsx — 100%</div>
              </div>

              {/* Code Area */}
              <div className="p-6 md:p-8 font-mono text-xs md:text-sm min-h-[320px] relative overflow-hidden">
                <div className="space-y-4">
                  <div className="text-text-muted mb-4 opacity-40 italic">
                    {isRefactored ? '// Intelligence Layer Provisioned' : '// Warning: High Latency / High Cost detected'}
                  </div>

                  {activeLines.map((line, i) => (
                    <div 
                      key={line.id} 
                      className={`flex items-center gap-4 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <span className="text-text-muted/30 w-4 text-right select-none">{i + 1}</span>
                      <div className={`flex-1 flex justify-between items-center p-3 rounded-lg border transition-all duration-300 ${
                        line.type === 'manual' 
                          ? 'bg-error/5 border-error/10 text-error/80' 
                          : 'bg-radiance-gold/5 border-radiance-gold/30 text-radiance-gold shadow-[0_0_20px_rgba(232,184,74,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="opacity-50">{line.type === 'manual' ? '⨯' : '⚡'}</span>
                          <span className="font-semibold tracking-tighter">{line.label}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          line.type === 'manual' ? 'bg-error/10 text-error' : 'bg-radiance-gold/20 text-radiance-gold'
                        }`}>
                          {line.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compiler Overlay when refactoring */}
                <div className={`absolute inset-0 bg-depth-elevated/80 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-500 ${isRefactored && activeLines.length > 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="w-16 h-16 border-t-2 border-r-2 border-radiance-gold rounded-full animate-spin mb-4" />
                  <div className="text-radiance-gold font-mono text-xs tracking-widest animate-pulse">COMPILING_VALUE...</div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="bg-depth-surface/30 border-t border-depth-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-mono text-text-muted">
                    <span className="text-text-primary">Ln {activeLines.length}, Col 1</span> — UTF-8
                  </div>
                </div>
                <button 
                  onClick={handleRefactor}
                  className={`px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                    isRefactored 
                      ? 'bg-depth-surface border border-depth-border text-text-muted hover:text-text-primary' 
                      : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber hover:shadow-[0_0_24px_rgba(232,184,74,0.4)]'
                  }`}
                  style={!isRefactored ? {
                    animation: 'pulse-glow 2.5s ease-in-out infinite',
                    boxShadow: '0 0 16px rgba(232, 184, 74, 0.25)'
                  } : {}}
                >
                  {isRefactored ? 'REVERT_SYSTEM' : 'COMPILE_OPTIMIZATION'}
                  {!isRefactored && <span className="animate-pulse">_</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Impact Readout */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-depth-border bg-depth-elevated/30 relative overflow-hidden group hover:border-radiance-gold/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-radiance-gold/5 blur-2xl group-hover:bg-radiance-gold/10 transition-colors" />
                <div className="relative z-10 space-y-2">
                  <div className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Economic_Compression</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-medium transition-colors duration-700 ${isRefactored ? 'text-radiance-gold' : 'text-text-primary'}`}>
                      {isRefactored ? '4,500x' : '1.0x'}
                    </span>
                    <span className="text-xs text-text-muted font-mono tracking-tighter">LEVERAGE_INDEX</span>
                  </div>
                  <p className="text-sm text-text-secondary font-light">
                    Scaling labor is linear. Scaling intelligence is exponential. The gap is your competitive moat.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-depth-border bg-depth-elevated/30 relative overflow-hidden group hover:border-error/30 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-error/5 blur-2xl group-hover:bg-error/10 transition-colors" />
                <div className="relative z-10 space-y-2">
                  <div className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Cost_Reduction</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-medium transition-colors duration-700 ${isRefactored ? 'text-success' : 'text-text-primary'}`}>
                      {isRefactored ? '99.8%' : '0.0%'}
                    </span>
                    <span className="text-xs text-text-muted font-mono tracking-tighter">PER_UNIT_OUTPUT</span>
                  </div>
                  <p className="text-sm text-text-secondary font-light">
                    Remove human bandwidth as the bottleneck. Replace high-cost manual hours with low-cost compute.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center lg:items-start gap-6">
              <button
                onClick={onLearnMore}
                className="group relative px-8 py-4 overflow-hidden rounded-xl bg-depth-surface border border-depth-border hover:border-radiance-gold/50 transition-all"
              >
                <div className="relative flex items-center gap-3 text-text-primary font-medium uppercase tracking-wider text-xs">
                  Read the Deep Dive
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-depth-base bg-depth-surface flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-radiance-gold/40" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest italic">
                  Systems running in 12+ industries
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Footer Logs */}
        <div className="mt-16 pt-8 border-t border-depth-border/50 flex flex-wrap justify-center md:justify-between gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="text-radiance-gold">[✓]</span> DATA_INGESTION_READY
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="text-radiance-gold">[✓]</span> NEURAL_TRIAGE_ACTIVE
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="text-radiance-gold">[✓]</span> ARBITRAGE_GAP_RESOLVED
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaborArbitrageHighlight;
