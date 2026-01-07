/**
 * Testimonial Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import Card from './Card';
import { QuoteIcon, StarIcon } from './Icons';
import { Testimonial as TestimonialType } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
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
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold">
            {testimonial.author.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-text-primary font-semibold">{testimonial.author}</p>
          <p className="text-text-muted text-sm">
            {testimonial.role}, {testimonial.company}
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
