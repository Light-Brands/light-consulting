/**
 * Accordion Component
 * Light Brand Consulting Design System
 */

import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { ChevronDownIcon } from './Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="border-b border-depth-border">
      <button
        className="w-full py-5 flex items-center justify-between text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-text-primary font-semibold group-hover:text-radiance-gold transition-colors">
          {title}
        </span>
        <ChevronDownIcon
          size={20}
          className={cn(
            'text-text-muted transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <div className="text-text-secondary text-sm">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  defaultOpen?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = -1,
}) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="divide-y divide-depth-border border-t border-depth-border">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
