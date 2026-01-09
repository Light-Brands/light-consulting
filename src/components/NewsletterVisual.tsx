/**
 * Newsletter Visual
 * CONCEPT: "The Connection"
 * Simple newsletter signup with minimalist design
 */

import React, { useState, useEffect, useRef } from 'react';
import { MailIcon, CheckIcon } from './Icons';
import { isValidEmail } from '../lib/utils';

export const NewsletterVisual: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Newsletter::Weekly_Illuminations
            </span>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto flex items-center justify-center">
              <CheckIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">You're In!</h3>
              <p className="text-text-secondary">Check your inbox for a confirmation email.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold text-text-primary">
                Weekly Illuminations
              </h3>
              <p className="text-sm text-text-secondary">
                AI insights for business leaders. No jargon, just clarity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <MailIcon size={18} />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-depth-elevated/50 border border-depth-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-radiance-gold/50 focus:bg-depth-elevated transition-all"
                />
                {error && (
                  <p className="mt-2 text-xs text-error">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-radiance-gold hover:bg-radiance-amber text-depth-base font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-xs text-text-muted text-center">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterVisual;
