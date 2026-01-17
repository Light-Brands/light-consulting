/**
 * Assessment Educate Stage
 * VSL video viewing with mandatory completion tracking
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

interface AssessmentEducateStageProps {
  formData: AssessmentFormData;
  onVSLComplete: (watchPercentage: number) => void;
  onBack: () => void;
}

export const AssessmentEducateStage: React.FC<AssessmentEducateStageProps> = ({
  formData,
  onVSLComplete,
  onBack,
}) => {
  const [watchProgress, setWatchProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const requiredPercentage = ASSESSMENT_CONFIG.vsl.minimumWatchPercentage;

  // Simulate video progress tracking
  // In production, integrate with YouTube/Vimeo/Wistia API
  useEffect(() => {
    if (isPlaying && !canProceed) {
      progressIntervalRef.current = setInterval(() => {
        setWatchProgress((prev) => {
          const newProgress = Math.min(prev + 0.5, 100);
          if (newProgress >= requiredPercentage) {
            setCanProceed(true);
          }
          return newProgress;
        });
      }, 1000); // Update every second
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, canProceed, requiredPercentage]);

  const handlePlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleContinue = () => {
    if (canProceed) {
      onVSLComplete(watchProgress);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Watch Before Your Call
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          This video explains exactly what the AI Go/No-Go Assessment delivers and what to expect.
          <strong className="text-text-primary"> You must watch at least {requiredPercentage}% to continue.</strong>
        </p>
      </div>

      {/* Video Container */}
      <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
        <div className="aspect-video relative bg-depth-base">
          {/* Play Overlay - shown before video starts */}
          {!hasStarted && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-depth-base/80 z-10"
              onClick={handlePlay}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto hover:bg-radiance-gold/30 transition-colors">
                  <svg className="w-10 h-10 text-radiance-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-text-secondary">Click to play</p>
                <p className="text-text-muted text-sm">Duration: {ASSESSMENT_CONFIG.vsl.estimatedDuration}</p>
              </div>
            </div>
          )}

          {/* Video Embed - Replace with actual VSL embed */}
          <iframe
            src={hasStarted ? `${ASSESSMENT_CONFIG.vsl.url}?autoplay=1` : ASSESSMENT_CONFIG.vsl.url}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            className="absolute inset-0"
            title="AI Go/No-Go Assessment Overview"
          />

          {/* Progress Bar Overlay */}
          {hasStarted && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-depth-base/90 to-transparent">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Progress</span>
                  <span className={`font-medium ${canProceed ? 'text-radiance-gold' : 'text-text-secondary'}`}>
                    {Math.round(watchProgress)}%
                  </span>
                </div>
                <div className="h-2 bg-depth-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-300"
                    style={{ width: `${watchProgress}%` }}
                  />
                  {/* Required threshold marker */}
                  <div
                    className="absolute h-2 w-0.5 bg-text-secondary/50"
                    style={{ left: `${requiredPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Controls for Development */}
      {hasStarted && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </Button>
          <span className="text-text-muted text-sm">
            (Dev: Simulating video progress)
          </span>
        </div>
      )}

      {/* Warning Message */}
      {hasStarted && !canProceed && (
        <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-radiance-gold text-xl">&#9888;</span>
            <div>
              <p className="text-text-secondary text-sm">
                <strong className="text-text-primary">Keep watching:</strong> You need to watch at least {requiredPercentage}% of this video before you can proceed.
                This ensures you fully understand what you&apos;re committing to.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {canProceed && (
        <div className="bg-growth-emerald/5 border border-growth-emerald/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-growth-emerald text-xl">&#10003;</span>
            <div>
              <p className="text-text-secondary text-sm">
                <strong className="text-text-primary">Video complete!</strong> You now understand what the AI Go/No-Go Assessment delivers.
                Click below to confirm your booking and proceed to payment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-depth-border">
        <Button
          variant="ghost"
          onClick={onBack}
        >
          &#8592; Back
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!canProceed}
          className={!canProceed ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {canProceed ? 'Continue to Confirm' : `Watch ${requiredPercentage - Math.round(watchProgress)}% more`}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentEducateStage;
