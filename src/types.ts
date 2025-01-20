export interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  category: 'work' | 'personal' | 'health' | 'other';
}

export type TimeSlot = {
  hour: string;
  tasks: Task[];
};