/**
 * Quick Add Todo Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import type { TodoPriority } from '@/types/todos';

interface QuickAddTodoProps {
  onAdd: (data: {
    title: string;
    priority: TodoPriority;
    due_date?: string;
    proposal_id?: string;
  }) => Promise<void>;
  proposalId?: string;
  placeholder?: string;
}

export const QuickAddTodo: React.FC<QuickAddTodoProps> = ({
  onAdd,
  proposalId,
  placeholder = 'Add a new task...',
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsAdding(true);
    try {
      await onAdd({
        title: title.trim(),
        priority,
        due_date: dueDate || undefined,
        proposal_id: proposalId,
      });
      setTitle('');
      setDueDate('');
      setPriority('medium');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const priorityOptions: { value: TodoPriority; label: string; color: string }[] = [
    { value: 'urgent', label: '!!!!', color: 'text-red-400' },
    { value: 'high', label: '!!!', color: 'text-orange-400' },
    { value: 'medium', label: '!!', color: 'text-amber-400' },
    { value: 'low', label: '!', color: 'text-gray-400' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
      <div className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-dashed border-text-muted flex-shrink-0" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-sm"
          />
          {title && !isExpanded && (
            <button
              type="submit"
              disabled={isAdding}
              className="px-3 py-1.5 bg-radiance-gold/10 text-radiance-gold rounded-lg text-sm font-medium hover:bg-radiance-gold/20 transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-depth-border">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Priority */}
            <div className="flex items-center gap-1 bg-depth-elevated rounded-lg p-1">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={`
                    px-2 py-1 text-xs font-bold rounded transition-colors
                    ${priority === opt.value ? `${opt.color} bg-depth-base` : 'text-text-muted hover:text-text-primary'}
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Due date */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-depth-elevated border border-depth-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-radiance-gold"
            />

            <div className="flex-1" />

            {/* Actions */}
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setTitle('');
                setDueDate('');
                setPriority('medium');
              }}
              className="px-3 py-1.5 text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isAdding}
              className="px-4 py-1.5 bg-radiance-gold text-depth-base rounded-lg text-sm font-medium hover:bg-radiance-amber transition-colors disabled:opacity-50"
            >
              {isAdding ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default QuickAddTodo;
