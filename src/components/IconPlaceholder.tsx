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
    cream: 'text-text-secondary bg-depth-surface',
  };

  const colorBorder = {
    gold: 'border-radiance-gold/30',
    amber: 'border-radiance-amber/30',
    cream: 'border-depth-border',
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

// Industry-specific SVG icons
const IndustryIcons: Record<string, React.ReactNode> = {
  'Healthcare & Life Sciences': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
    </svg>
  ),
  'Financial Services': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'E-commerce & Retail': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  'Professional Services': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75v-4.25m0 0l-4.5-4.5m4.5 4.5l4.5-4.5M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    </svg>
  ),
  'Manufacturing & Logistics': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125H20.25M8.25 18.75h5.25M8.25 18.75H5.625c-.621 0-1.125-.504-1.125-1.125v-9.75m13.5 3v6.75m0 0v-6.75m0 6.75h-3m-9 0H5.625a1.125 1.125 0 01-1.125-1.125v-9.75m9 0V9.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v3.75m0 0V18.75m0-9.75v-3.75m0 3.75h3m-3 0h-3" />
    </svg>
  ),
  'Media & Entertainment': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  'Education & EdTech': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15m-9 0v-1.5c0-1.1.9-2 2-2h2a2 2 0 012 2V15m-6 0h6" />
    </svg>
  ),
  'Real Estate & PropTech': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75H21m-3.75 3.75H21m-3.75-7.5H21m-4.5 0v-.75c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125v.75m0 0H9m1.5-3H9m-1.5 3v-.75c0-.621-.504-1.125-1.125-1.125h-2.25C5.504 6.75 5 7.254 5 7.875v.75m0 0H3m9 10.5v-5.25c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125v5.25m9 0v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v3.375m0 0H21" />
    </svg>
  ),
};

export const IndustryIcon: React.FC<IndustryIconProps> = ({
  src,
  alt,
  label,
  className = '',
}) => {
  // Always use custom SVG icons for industries
  const customIcon = IndustryIcons[label] || (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
    </svg>
  );

  return (
    <div
      className={`relative flex flex-col items-center gap-3 p-4 rounded-brand-card bg-depth-subtle hover:bg-depth-elevated transition-colors ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-radiance-gold/10 border border-dashed border-radiance-gold/30 flex items-center justify-center text-radiance-gold">
          {customIcon}
        </div>
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
