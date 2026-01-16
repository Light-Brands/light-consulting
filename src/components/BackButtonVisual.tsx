/**
 * Back Button Visual
 * CONCEPT: "The Return"
 * Back button with minimalist design
 */

import React from 'react';
import { ArrowLeftIcon } from './Icons';

interface BackButtonVisualProps {
  label: string;
  onClick: () => void;
}

export const BackButtonVisual: React.FC<BackButtonVisualProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm mb-8 transition-colors"
    >
      <ArrowLeftIcon
        size={16}
        className="transition-transform group-hover:-translate-x-1"
      />
      <span>{label}</span>
    </button>
  );
};

export default BackButtonVisual;
