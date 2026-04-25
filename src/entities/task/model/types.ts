export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  goalId: string;
  title: string;
  status: TaskStatus;
  deadline?: string;
  priority: TaskPriority;
  tags: string[];
  timeSpent: number;
  timerStartedAt?: string;
  createdAt: string;
  updatedAt: string;
};
