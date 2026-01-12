/**
 * Book Progress Visual
 * CONCEPT: "The Journey"
 * Progress indicator for booking steps
 */

import React from 'react';

interface BookProgressVisualProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const BookProgressVisual: React.FC<BookProgressVisualProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      {/* Technical header */}
      <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
          Booking::Step_{currentStep}_of_{totalSteps}
        </span>
      </div>

      {/* Progress info */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-text-muted font-medium">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-radiance-gold font-semibold">
          {stepLabels[currentStep - 1]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-depth-surface rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 h-full bg-radiance-gold blur-sm transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        {/* Shine effect */}
        {progress > 0 && (
          <div
            className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ 
              left: `${Math.max(0, progress - 25)}%`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookProgressVisual;
