/**
 * Alert Component
 * Light Brand Consulting Design System
 * 
 * Alert and notification components for user feedback
 */

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, transition } from './utils';
import { IconButton } from './Button';
import { tokens } from '@/design-system';

// ============================================================================
// Alert Variants
// ============================================================================

const alertVariants = cva(
  ['relative rounded-brand-card border p-4', transition],
  {
    variants: {
      variant: {
        info: 'bg-info/10 border-info/30 text-info',
        success: 'bg-success/10 border-success/30 text-success',
        warning: 'bg-warning/10 border-warning/30 text-warning',
        error: 'bg-error/10 border-error/30 text-error',
        default: 'bg-depth-surface border-depth-border text-text-secondary',
      },
      size: {
        sm: 'text-sm p-3',
        md: 'text-sm p-4',
        lg: 'text-base p-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================================================
// Alert Icons
// ============================================================================

const AlertIcon: React.FC<{ variant: string; size?: number }> = ({ variant, size = 20 }) => {
  const icons = {
    info: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    error: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    default: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[variant as keyof typeof icons] || icons.default;
};

// ============================================================================
// Alert Props
// ============================================================================

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert title */
  title?: string;
  /** Alert content */
  children: React.ReactNode;
  /** Show icon */
  showIcon?: boolean;
  /** Dismissible */
  dismissible?: boolean;
  /** On dismiss callback */
  onDismiss?: () => void;
  /** Custom className */
  className?: string;
}

// ============================================================================
// Alert Component
// ============================================================================

/**
 * Alert component for displaying feedback messages
 * 
 * @example
 * <Alert variant="success" title="Success!" dismissible>
 *   Your changes have been saved.
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'default',
      size = 'md',
      title,
      children,
      showIcon = true,
      dismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          {showIcon && (
            <div className="flex-shrink-0 mt-0.5">
              <AlertIcon variant={variant || 'default'} size={size === 'sm' ? 16 : 20} />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-semibold text-text-primary mb-1">
                {title}
              </h4>
            )}
            <div className={cn('text-text-secondary', !title && 'text-current')}>
              {children}
            </div>
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <div className="flex-shrink-0">
              <button
                onClick={handleDismiss}
                className="text-current hover:opacity-70 transition-opacity"
                aria-label="Dismiss alert"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// ============================================================================
// Toast Notification (Simple Implementation)
// ============================================================================

export interface ToastProps extends Omit<AlertProps, 'size'> {
  /** Auto dismiss duration in ms */
  duration?: number;
  /** Position */
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}

/**
 * Toast notification component
 * 
 * @example
 * <Toast variant="success" duration={3000}>
 *   Operation completed successfully!
 * </Toast>
 */
export const Toast: React.FC<ToastProps> = ({
  duration = 5000,
  position = 'top-right',
  onDismiss,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  if (!isVisible) {
    return null;
  }

  const positions = {
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div
      className={cn(
        'fixed z-50 max-w-md w-full',
        'animate-slide-up',
        positions[position]
      )}
    >
      <Alert
        size="md"
        dismissible
        onDismiss={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        {...props}
      />
    </div>
  );
};

Toast.displayName = 'Toast';

// Export components
export default Alert;
