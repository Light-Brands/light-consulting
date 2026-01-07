/**
 * IconPlaceholder Component
 * Displays icons with graceful fallback to placeholder
 */

import React, { useState } from 'react';

interface IconPlaceholderProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  color?: 'gold' | 'amber' | 'cream';
  fallbackIcon?: React.ReactNode;
}

export const IconPlaceholder: React.FC<IconPlaceholderProps> = ({
  src,
  alt,
  size = 80,
  className = '',
  color = 'gold',
  fallbackIcon,
}) => {
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
  label: string;
  className?: string;
}

export const IndustryIcon: React.FC<IndustryIconProps> = ({
  src,
  alt,
  label,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const hasIcon = src && !imgError;

  return (
    <div
      className={`relative flex flex-col items-center gap-3 p-4 rounded-brand-card bg-depth-subtle hover:bg-depth-elevated transition-colors ${className}`}
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
  title: string;
  description: string;
  className?: string;
}

export const ValueIcon: React.FC<ValueIconProps> = ({
  src,
  alt,
  title,
  description,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const hasIcon = src && !imgError;

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="relative flex-shrink-0">
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
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    </div>
  );
};

export default IconPlaceholder;
