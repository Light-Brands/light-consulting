/**
 * Deliverable Link List Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { DeliverableLinkCard } from './DeliverableLinkCard';
import type { DeliverableLink, DeliverableLinkType } from '@/types/deliverables';

interface DeliverableLinkListProps {
  links: DeliverableLink[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  groupByType?: boolean;
}

const TYPE_ORDER: DeliverableLinkType[] = [
  'production',
  'staging',
  'design',
  'prototype',
  'document',
  'repository',
  'video',
  'presentation',
  'spreadsheet',
  'other',
];

export const DeliverableLinkList: React.FC<DeliverableLinkListProps> = ({
  links,
  isLoading = false,
  emptyMessage = 'No deliverable links yet',
  onEdit,
  onDelete,
  groupByType = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-depth-surface border border-depth-border rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-depth-elevated" />
              <div className="flex-1">
                <div className="h-4 bg-depth-elevated rounded w-1/3 mb-2" />
                <div className="h-3 bg-depth-elevated rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-depth-elevated rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  if (groupByType) {
    // Group links by type
    const groupedLinks = links.reduce((acc, link) => {
      const type = link.link_type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(link);
      return acc;
    }, {} as Record<DeliverableLinkType, DeliverableLink[]>);

    return (
      <div className="space-y-6">
        {TYPE_ORDER.filter((type) => groupedLinks[type]?.length > 0).map((type) => (
          <div key={type}>
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
              {type.replace('_', ' ')}s
            </h4>
            <div className="space-y-3">
              {groupedLinks[type].map((link) => (
                <DeliverableLinkCard
                  key={link.id}
                  link={link}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <DeliverableLinkCard
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DeliverableLinkList;
