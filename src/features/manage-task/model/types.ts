import type { TaskPriority, TaskStatus } from 'entities/task';

export type TaskDialogMode = 'create' | 'edit';

export type TaskDialogState = {
  mode: TaskDialogMode;
  taskId: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};
