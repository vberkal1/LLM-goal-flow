import type { Task } from 'entities/task';
import type { TaskDialogMode, TaskDialogState } from './types';

export const defaultTaskState: TaskDialogState = {
  mode: 'create',
  taskId: null,
  title: '',
  status: 'todo',
  priority: 'medium',
};

export function createEditState(task: Task): TaskDialogState {
  return {
    mode: 'edit',
    taskId: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
  };
}

export function getDialogTitle(mode: TaskDialogMode) {
  return mode === 'create' ? 'Новая задача' : 'Редактировать задачу';
}
