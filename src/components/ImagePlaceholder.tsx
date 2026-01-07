/**
 * ImagePlaceholder Component
 * Displays image placeholders with AI generation prompts
 */

import React, { useState } from 'react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  prompt: string;
  dimensions: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'banner';
  showPromptOnHover?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  prompt,
  dimensions,
  className = '',
  aspectRatio = 'video',
  showPromptOnHover = true,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    banner: 'aspect-[3/1]',
  };

  const hasImage = src && !imgError;

  return (
    <div
      className={`relative overflow-hidden rounded-brand-card ${aspectClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => showPromptOnHover && setShowPrompt(true)}
      onMouseLeave={() => setShowPrompt(false)}
    >
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Placeholder gradient background */
        <div className="absolute inset-0 bg-gradient-to-br from-radiance-gold/20 via-radiance-amber/10 to-depth-elevated flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 mb-4 rounded-full bg-radiance-gold/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-radiance-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-text-muted text-sm text-center font-medium mb-1">{alt}</p>
          <p className="text-text-muted/60 text-xs">{dimensions}</p>
        </div>
      )}

      {/* Prompt overlay on hover */}
      {showPrompt && (
        <div className="absolute inset-0 bg-depth-base/95 p-4 overflow-auto animate-fade-in">
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
            <span className="text-radiance-gold text-sm font-semibold">AI Image Prompt</span>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed">{prompt}</p>
          <div className="mt-3 pt-3 border-t border-depth-border">
            <p className="text-text-muted text-xs">
              <span className="text-radiance-gold">Dimensions:</span> {dimensions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * AvatarPlaceholder Component
 * Circular image placeholder for testimonial avatars
 */
interface AvatarPlaceholderProps {
  src?: string;
  alt: string;
  prompt?: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  src,
  alt,
  prompt,
  initials,
  size = 'md',
  className = '',
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
  };

  const hasImage = src && !imgError;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => prompt && setShowPrompt(true)}
      onMouseLeave={() => setShowPrompt(false)}
    >
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center font-bold ${
          hasImage ? '' : 'bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base'
        }`}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Prompt tooltip */}
      {showPrompt && prompt && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-depth-base border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
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
            <span className="text-radiance-gold text-xs font-semibold">Avatar Prompt</span>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed">{prompt}</p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-depth-base" />
        </div>
      )}
    </div>
  );
};

/**
 * HeroBackground Component
 * Full-width background image with overlay and prompt
 */
interface HeroBackgroundProps {
  src?: string;
  alt: string;
  prompt: string;
  dimensions: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  src,
  alt,
  prompt,
  dimensions,
  children,
  className = '',
  overlayOpacity = 0.7,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasImage = src && !imgError;

  return (
    <div className={`relative ${className}`}>
      {/* Background */}
      {hasImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        >
          <div
            className="absolute inset-0 bg-depth-base"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-depth-base via-depth-elevated to-depth-base">
          {/* Decorative placeholder gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Prompt indicator button */}
      <button
        onClick={() => setShowPrompt(!showPrompt)}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-depth-base/80 border border-depth-border flex items-center justify-center hover:bg-depth-elevated transition-colors"
        title="View image prompt"
      >
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Prompt panel */}
      {showPrompt && (
        <div className="absolute top-14 right-4 z-20 w-80 max-h-[60vh] overflow-auto p-4 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-radiance-gold"
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
              <span className="text-radiance-gold text-sm font-semibold">Hero Background Prompt</span>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-text-muted hover:text-text-primary"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-text-muted text-xs mb-2">{alt}</p>
          <p className="text-text-secondary text-sm leading-relaxed mb-3">{prompt}</p>
          <div className="pt-3 border-t border-depth-border">
            <p className="text-text-muted text-xs">
              <span className="text-radiance-gold">Dimensions:</span> {dimensions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePlaceholder;
