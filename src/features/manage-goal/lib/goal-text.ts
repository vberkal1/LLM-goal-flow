import type { Goal } from 'entities/goal';

export function getGoalPanelDescription() {
  return 'Создание, выбор и управление активной целью.';
}

export function getGoalEmptyState(goals: Goal[]) {
  return goals.length === 0
    ? 'Пока нет целей. Создайте первую, чтобы продолжить работу.'
    : null;
}
