/**
 * IconPlaceholder Component
 * Displays icon placeholders with AI generation prompts for custom icons
 */

import React, { useState } from 'react';

interface IconPlaceholderProps {
  src?: string;
  alt: string;
  prompt: string;
  dimensions: string;
  size?: number;
  className?: string;
  color?: 'gold' | 'amber' | 'cream';
  fallbackIcon?: React.ReactNode;
}

export const IconPlaceholder: React.FC<IconPlaceholderProps> = ({
  src,
  alt,
  prompt,
  dimensions,
  size = 80,
  className = '',
  color = 'gold',
  fallbackIcon,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasIcon = src && !imgError;

  const colorClasses = {
    gold: 'text-radiance-gold bg-radiance-gold/10',
    amber: 'text-radiance-amber bg-radiance-amber/10',
    cream: 'text-clarity-cream bg-clarity-cream/10',
  };

  const colorBorder = {
    gold: 'border-radiance-gold/30',
    amber: 'border-radiance-amber/30',
    cream: 'border-clarity-cream/30',
  };

  // Default fallback icon (abstract geometric shape)
  const DefaultFallbackIcon = () => (
    <svg
      width={size * 0.5}
      height={size * 0.5}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="22" x2="12" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
    </svg>
  );

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setShowPrompt(true)}
      onMouseLeave={() => setShowPrompt(false)}
    >
      {hasIcon ? (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Placeholder with icon shape */
        <div
          className={`w-full h-full rounded-2xl flex items-center justify-center border border-dashed ${colorClasses[color]} ${colorBorder[color]} transition-all duration-200 hover:border-solid`}
        >
          {fallbackIcon || <DefaultFallbackIcon />}
        </div>
      )}

      {/* Prompt tooltip on hover */}
      {showPrompt && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-radiance-gold/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-radiance-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-radiance-gold text-sm font-semibold">Custom Icon Prompt</span>
          </div>
          <p className="text-text-muted text-xs mb-2 font-medium">{alt}</p>
          <p className="text-text-secondary text-xs leading-relaxed">{prompt}</p>
          <div className="mt-3 pt-3 border-t border-depth-border">
            <p className="text-text-muted text-xs">
              <span className="text-radiance-gold">Dimensions:</span> {dimensions}
            </p>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-depth-border" />
        </div>
      )}
    </div>
  );
};

/**
 * IndustryIcon Component
 * Specialized icon placeholder for industry icons with grid layout
 */
interface IndustryIconProps {
  src?: string;
  alt: string;
  prompt: string;
  label: string;
  className?: string;
}

export const IndustryIcon: React.FC<IndustryIconProps> = ({
  src,
  alt,
  prompt,
  label,
  className = '',
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasIcon = src && !imgError;

  return (
    <div
      className={`relative flex flex-col items-center gap-3 p-4 rounded-brand-card bg-depth-subtle hover:bg-depth-elevated transition-colors cursor-pointer ${className}`}
      onMouseEnter={() => setShowPrompt(true)}
      onMouseLeave={() => setShowPrompt(false)}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {hasIcon ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-radiance-gold/10 border border-dashed border-radiance-gold/30 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-radiance-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            </svg>
          </div>
        )}
      </div>
      <span className="text-text-primary text-sm font-medium text-center">{label}</span>

      {/* Prompt tooltip */}
      {showPrompt && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-radiance-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-radiance-gold text-xs font-semibold">Industry Icon Prompt</span>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed">{prompt}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-depth-border" />
        </div>
      )}
    </div>
  );
};

/**
 * ValueIcon Component
 * Specialized icon for company values with description
 */
interface ValueIconProps {
  src?: string;
  alt: string;
  prompt: string;
  title: string;
  description: string;
  className?: string;
}

export const ValueIcon: React.FC<ValueIconProps> = ({
  src,
  alt,
  prompt,
  title,
  description,
  className = '',
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasIcon = src && !imgError;

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div
        className="relative flex-shrink-0"
        onMouseEnter={() => setShowPrompt(true)}
        onMouseLeave={() => setShowPrompt(false)}
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
          {hasIcon ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-radiance-gold/10 border border-dashed border-radiance-gold/30 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-radiance-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              </svg>
            </div>
          )}
        </div>

        {/* Prompt tooltip */}
        {showPrompt && (
          <div className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-4 h-4 text-radiance-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-radiance-gold text-xs font-semibold">Value Icon Prompt</span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">{prompt}</p>
            <div className="absolute top-full left-4 border-8 border-transparent border-t-depth-border" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    </div>
  );
};

export default IconPlaceholder;
