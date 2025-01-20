import React from 'react';
import { Check } from 'lucide-react';
import type { TimeSlot } from '../types';
import { cn } from '../lib/utils';

interface TimelineSlotProps {
  slot: TimeSlot;
  onToggleTask: (taskId: string) => void;
}

export function TimelineSlot({ slot, onToggleTask }: TimelineSlotProps) {
  return (
    <div className="flex gap-3 py-2 px-3">
      <div className="w-12 text-xs font-medium text-muted-foreground">{slot.hour}</div>
      <div className="flex-1">
        {slot.tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "mb-2 rounded-lg p-3 transition-all border border-border/50",
              task.completed ? "bg-primary/10" : "bg-card hover:bg-accent/50"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={cn(
                    "h-4 w-4 rounded-full flex items-center justify-center border",
                    task.completed
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-primary/50 hover:border-primary"
                  )}
                >
                  {task.completed && <Check size={12} />}
                </button>
                <h3 className={cn(
                  "font-medium text-sm truncate",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
              </div>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                getCategoryStyle(task.category)
              )}>
                {task.category}
              </span>
            </div>
            {task.description && (
              <p className={cn(
                "mt-1 text-xs text-muted-foreground line-clamp-2",
                task.completed && "text-muted-foreground/70"
              )}>
                {task.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getCategoryStyle(category: Task['category']) {
  switch (category) {
    case 'work':
      return 'bg-blue-500/20 text-blue-500';
    case 'personal':
      return 'bg-purple-500/20 text-purple-500';
    case 'health':
      return 'bg-green-500/20 text-green-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
}