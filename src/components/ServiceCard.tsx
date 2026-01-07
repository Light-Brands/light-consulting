/**
 * ServiceCard Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { cn } from '../lib/utils';
import Card from './Card';
import Tag from './Tag';
import Button from './Button';
import { ArrowRightIcon, ClockIcon, DollarIcon } from './Icons';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
  onLearnMore: () => void;
  onBook: () => void;
  icon?: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  featured = false,
  onLearnMore,
  onBook,
  icon,
}) => {
  return (
    <Card
      elevation={featured ? 'elevated' : 'subtle'}
      hover
      className={cn(
        'flex flex-col h-full relative overflow-visible',
        featured && 'border-radiance-gold/30 ring-1 ring-radiance-gold/20'
      )}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <Tag variant="premium" size="sm">
            Most Popular
          </Tag>
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
            featured
              ? 'bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base'
              : 'bg-depth-surface text-radiance-gold'
          )}
        >
          {icon}
        </div>
      )}

      {/* Title & Tagline */}
      <h3 className="text-xl font-bold text-text-primary mb-2">{service.name}</h3>
      <p className="text-text-secondary text-sm mb-4">{service.tagline}</p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <DollarIcon size={16} />
          <span>{service.investment}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <ClockIcon size={16} />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-6 flex-grow">
        {service.description}
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Button
          variant={featured ? 'primary' : 'outline'}
          size="sm"
          onClick={onBook}
          className="flex-1"
        >
          Book Now
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLearnMore}
          icon={<ArrowRightIcon size={16} />}
        >
          Details
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;
