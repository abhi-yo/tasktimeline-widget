import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import type { Task, TimeSlot } from './types';
import { TimelineSlot } from './components/TimelineSlot';
import { AddTaskForm } from './components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: crypto.randomUUID(),
        completed: false,
      },
    ]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const timeSlots: TimeSlot[] = Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, '0')}:00`;
    return {
      hour,
      tasks: tasks.filter((task) => {
        const taskHour = task.time.split(':')[0];
        return taskHour === hour.split(':')[0];
      }),
    };
  });

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="max-w-md mx-auto bg-background border border-border/50 rounded-3xl shadow-lg overflow-hidden">
        <header className="px-4 py-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h1 className="text-sm font-semibold">Timeline</h1>
            </div>
            <AddTaskForm onAddTask={handleAddTask} />
          </div>
        </header>
        <main className="h-[600px] overflow-y-auto">
          <div className="divide-y divide-border/50">
            {timeSlots.map((slot) => (
              <TimelineSlot
                key={slot.hour}
                slot={slot}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;