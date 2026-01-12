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
    <div className="mb-10">
      {/* Progress info */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-text-muted font-medium tracking-wide">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-radiance-gold font-semibold tracking-wide">
          {stepLabels[currentStep - 1]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 bg-depth-surface rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 h-full bg-radiance-gold blur-md transition-all duration-700 opacity-60"
          style={{ width: `${progress}%` }}
        />
        {/* Shine effect */}
        {progress > 0 && (
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700"
            style={{ 
              left: `${Math.max(0, progress - 33)}%`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookProgressVisual;
