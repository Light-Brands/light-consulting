/**
 * Modal Component
 * Light Brand Consulting Design System
 * 
 * Accessible modal dialog component
 */

import React, { useEffect, useRef } from 'react';
import { cn, transition } from './utils';
import { IconButton } from './Button';
import { tokens } from '@/design-system';

// ============================================================================
// Modal Props
// ============================================================================

export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Custom className for modal content */
  className?: string;
  /** Initial focus ref */
  initialFocusRef?: React.RefObject<HTMLElement>;
}

// ============================================================================
// Modal Component
// ============================================================================

/**
 * Modal dialog component with accessibility features
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   size="md"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  initialFocusRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Size styles
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  // Handle focus trap and restore
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus initial element or first focusable element
      setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else {
          const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          firstFocusable?.focus();
        }
      }, 0);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      previousActiveElement.current?.focus();
      
      // Restore body scroll
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialFocusRef]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-depth-base/80 backdrop-blur-sm animate-fade-in"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full',
          'bg-depth-elevated border border-depth-border rounded-brand-modal',
          'shadow-floating',
          'animate-slide-up',
          sizeStyles[size],
          'max-h-[90vh] overflow-hidden flex flex-col',
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-depth-border flex-shrink-0">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-bold text-text-primary"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="h-5 w-5"
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
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';

// ============================================================================
// Modal Header Component
// ============================================================================

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-depth-border', className)}>
      {children}
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';

// ============================================================================
// Modal Body Component
// ============================================================================

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'Modal.Body';

// ============================================================================
// Modal Footer Component
// ============================================================================

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  align = 'right',
}) => {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-depth-border',
        'flex items-center gap-3',
        alignStyles[align],
        className
      )}
    >
      {children}
    </div>
  );
};

ModalFooter.displayName = 'Modal.Footer';

// ============================================================================
// Attach sub-components
// ============================================================================

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// ============================================================================
// Confirm Dialog Component
// ============================================================================

export interface ConfirmDialogProps extends Omit<ModalProps, 'children'> {
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button variant */
  confirmVariant?: 'primary' | 'danger';
  /** Dialog message */
  message: React.ReactNode;
  /** On confirm callback */
  onConfirm: () => void;
  /** Is confirming (loading state) */
  isConfirming?: boolean;
}

/**
 * Confirmation dialog component
 * 
 * @example
 * <ConfirmDialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete Item"
 *   message="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   confirmVariant="danger"
 * />
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  message,
  onConfirm,
  isConfirming = false,
  onClose,
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm();
    if (!isConfirming) {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} {...props}>
      <div className="text-text-secondary mb-6">
        {message}
      </div>
      
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isConfirming}
          className={cn(
            'px-6 py-3 text-sm font-semibold',
            'bg-transparent text-text-secondary border border-depth-border rounded-brand-btn',
            'hover:bg-depth-surface',
            transition,
            'disabled:opacity-40 disabled:cursor-not-allowed'
          )}
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className={cn(
            'px-6 py-3 text-sm font-semibold rounded-brand-btn',
            transition,
            'disabled:opacity-40 disabled:cursor-not-allowed',
            confirmVariant === 'danger'
              ? 'bg-error text-text-primary hover:bg-error/90'
              : 'bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base hover:shadow-illumination'
          )}
        >
          {isConfirming ? 'Processing...' : confirmText}
        </button>
      </div>
    </Modal>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';

// Export components
export default Modal;
export type { ModalHeaderProps, ModalBodyProps, ModalFooterProps, ConfirmDialogProps };
