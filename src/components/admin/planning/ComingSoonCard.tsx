'use client';

import React from 'react';

interface ComingSoonCardProps {
  title: string;
  description: string;
}

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <div className="bg-depth-surface border border-depth-border rounded-xl p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-radiance-gold/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-radiance-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-muted max-w-md mx-auto">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-depth-elevated border border-depth-border text-text-muted text-sm">
        <div className="w-2 h-2 rounded-full bg-radiance-gold/40 animate-pulse" />
        Coming Soon
      </div>
    </div>
  );
}
