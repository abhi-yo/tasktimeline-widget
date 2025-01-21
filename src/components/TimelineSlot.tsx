import type { TimeSlot } from '../types';
import { cn } from '../lib/utils';

interface TimelineSlotProps {
  slot: TimeSlot;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TimelineSlot({ slot, onToggleTask, onDeleteTask }: TimelineSlotProps) {
  const handleTaskClick = (taskId: string, completed: boolean) => {
    if (!completed) {
      onToggleTask(taskId);
      setTimeout(() => onDeleteTask(taskId), 300);
    }
  };

  return (
    <div className="flex gap-4 px-4 py-3">
      <div className="w-12 text-sm text-muted-foreground">{slot.hour}</div>
      <div className="flex-1">
        {slot.tasks.map((task) => (
          <div key={task.id} className="group flex items-start gap-2 mb-3 last:mb-0">
            <button
              onClick={() => handleTaskClick(task.id, task.completed)}
              className={cn(
                'mt-1 h-4 w-4 rounded-full border-2 border-primary transition-colors duration-300',
                task.completed && 'bg-primary'
              )}
            />
            <div>
              <div className="font-medium">{task.title}</div>
              {task.description && (
                <div className="text-sm text-muted-foreground">{task.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}