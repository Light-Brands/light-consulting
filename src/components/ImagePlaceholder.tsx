/**
 * ImagePlaceholder Component
 * Displays images with graceful fallback to placeholder
 */

import React, { useState } from 'react';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'banner';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'video',
}) => {
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
          <p className="text-text-muted text-sm text-center font-medium">{alt}</p>
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
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
  };

  const hasImage = src && !imgError;

  return (
    <div className={`relative ${className}`}>
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
    </div>
  );
};

/**
 * HeroBackground Component
 * Full-width background image with overlay
 */
interface HeroBackgroundProps {
  src?: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  src,
  alt,
  children,
  className = '',
  overlayOpacity = 0.7,
}) => {
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
          {/* Hidden img for error detection */}
          <img
            src={src}
            alt={alt}
            className="hidden"
            onError={() => setImgError(true)}
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
    </div>
  );
};

export default ImagePlaceholder;
