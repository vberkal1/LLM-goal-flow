import type { GoalDialogMode, GoalDialogState } from './types';

export const initialDialogState: GoalDialogState = {
  mode: 'create',
  goalId: null,
  title: '',
};

export function createEditGoalState(goalId: string, title: string): GoalDialogState {
  return {
    mode: 'edit',
    goalId,
    title,
  };
}

export function getGoalDialogTitle(mode: GoalDialogMode) {
  return mode === 'create' ? 'Новая цель' : 'Переименовать цель';
}
