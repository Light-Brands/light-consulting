/**
 * User Assignment Dropdown Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface UserAssignmentDropdownProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  teamMembers: TeamMember[];
  placeholder?: string;
  size?: 'sm' | 'md';
}

export const UserAssignmentDropdown: React.FC<UserAssignmentDropdownProps> = ({
  value,
  onChange,
  disabled = false,
  teamMembers,
  placeholder = 'Unassigned',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedMember = teamMembers.find((m) => m.id === value);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          inline-flex items-center gap-2 rounded-lg font-medium
          transition-colors bg-depth-base border border-depth-border
          hover:border-radiance-gold/30
          ${sizeClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {selectedMember ? (
          <>
            <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center text-xs font-medium">
              {getInitials(selectedMember.full_name)}
            </div>
            <span className="text-text-primary truncate max-w-[100px]">
              {selectedMember.full_name}
            </span>
          </>
        ) : (
          <>
            <div className="w-5 h-5 rounded-full bg-gray-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-text-muted">{placeholder}</span>
          </>
        )}
        {!disabled && (
          <svg className="w-3 h-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-depth-surface border border-depth-border rounded-lg shadow-lg overflow-hidden min-w-[200px] max-h-[300px] overflow-y-auto">
          {/* Unassigned option */}
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
            className={`
              w-full px-3 py-2 text-left text-sm flex items-center gap-2
              transition-colors hover:bg-depth-elevated
              ${!value ? 'bg-depth-elevated' : ''}
            `}
          >
            <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-text-muted">{placeholder}</span>
          </button>

          {/* Divider */}
          <div className="border-t border-depth-border" />

          {/* Team members */}
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => {
                onChange(member.id);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm flex items-center gap-2
                transition-colors hover:bg-depth-elevated
                ${member.id === value ? 'bg-depth-elevated' : ''}
              `}
            >
              <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center text-xs font-medium">
                {getInitials(member.full_name)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-text-primary truncate">{member.full_name}</span>
                <span className="text-xs text-text-muted truncate">{member.email}</span>
              </div>
            </button>
          ))}

          {teamMembers.length === 0 && (
            <div className="px-3 py-4 text-center text-text-muted text-sm">
              No team members found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAssignmentDropdown;
