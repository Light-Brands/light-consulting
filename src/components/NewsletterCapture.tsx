/**
 * Newsletter Capture Component
 * Light Brand Consulting Design System
 */

import React, { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { MailIcon, CheckIcon } from './Icons';
import { isValidEmail } from '../lib/utils';

interface NewsletterCaptureProps {
  variant?: 'card' | 'inline';
}

export const NewsletterCapture: React.FC<NewsletterCaptureProps> = ({
  variant = 'card',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
  };

  if (isSuccess) {
    return (
      <Card
        elevation={variant === 'card' ? 'subtle' : 'none'}
        className={variant === 'card' ? 'p-8 text-center' : 'p-0 text-center'}
      >
        <div className="w-12 h-12 rounded-full bg-success/20 text-success mx-auto mb-4 flex items-center justify-center">
          <CheckIcon size={24} />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">You're In!</h3>
        <p className="text-text-secondary">
          Check your inbox for a confirmation email.
        </p>
      </Card>
    );
  }

  const content = (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Weekly Illuminations
        </h3>
        <p className="text-text-secondary text-sm">
          AI insights for business leaders. No jargon, just clarity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon size={18} />}
            error={error}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="sm:flex-shrink-0"
        >
          Subscribe
        </Button>
      </form>

      <p className="text-text-muted text-xs mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </>
  );

  if (variant === 'inline') {
    return <div className="py-4">{content}</div>;
  }

  return (
    <Card elevation="subtle" className="p-8 relative overflow-hidden">
      {/* Subtle illumination accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radiance-gold/5 blur-3xl pointer-events-none" />
      <div className="relative z-10">{content}</div>
    </Card>
  );
};

export default NewsletterCapture;
