/**
 * Testimonial Component
 * Light Brand Consulting Design System
 */

import React, { useState } from 'react';
import Card from './Card';
import { QuoteIcon, StarIcon } from './Icons';
import { Testimonial as TestimonialType } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasImage = testimonial.avatar && !imgError;

  return (
    <Card elevation="subtle" className="relative">
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-2 text-radiance-gold/20">
        <QuoteIcon size={48} />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={16} className="text-radiance-gold" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-text-primary text-lg mb-6 relative z-10">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div
          className="relative"
          onMouseEnter={() => testimonial.avatarPrompt && setShowPrompt(true)}
          onMouseLeave={() => setShowPrompt(false)}
        >
          {hasImage ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold cursor-help">
              {testimonial.author.charAt(0)}
            </div>
          )}

          {/* Avatar Prompt Tooltip */}
          {showPrompt && testimonial.avatarPrompt && (
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
              <p className="text-text-secondary text-xs leading-relaxed">{testimonial.avatarPrompt}</p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-depth-base" />
            </div>
          )}
        </div>
        <div>
          <p className="text-text-primary font-semibold">{testimonial.author}</p>
          <p className="text-text-muted text-sm">
            {testimonial.role},{' '}
            {testimonial.companyUrl ? (
              <a
                href={testimonial.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-radiance-gold hover:text-radiance-amber transition-colors"
              >
                {testimonial.company}
              </a>
            ) : (
              testimonial.company
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

interface TestimonialCarouselProps {
  testimonials: TestimonialType[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialCard;
