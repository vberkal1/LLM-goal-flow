import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetAppStore, useAppStore } from './store';

describe('app store', () => {
  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('test-id');
  });

  it('adds a goal and makes it active', () => {
    useAppStore.getState().addGoal('Новая цель');

    const state = useAppStore.getState();

    expect(state.goals[0]).toMatchObject({
      id: 'goal-test-id',
      title: 'Новая цель',
    });
    expect(state.activeGoalId).toBe('goal-test-id');
  });

  it('updates a goal title', () => {
    useAppStore.getState().updateGoal('goal-1', 'Обновленная цель');

    expect(useAppStore.getState().goals[0]?.title).toBe('Обновленная цель');
  });

  it('removes a goal, its tasks, and switches active goal', () => {
    useAppStore.getState().removeGoal('goal-1');

    const state = useAppStore.getState();

    expect(state.goals.map((goal) => goal.id)).toEqual(['goal-2']);
    expect(state.activeGoalId).toBe('goal-2');
    expect(state.tasks.every((task) => task.goalId !== 'goal-1')).toBe(true);
  });

  it('adds a task to the active goal', () => {
    useAppStore.getState().addTask({
      title: 'Новая задача',
      status: 'todo',
      priority: 'medium',
    });

    const state = useAppStore.getState();

    expect(state.tasks[0]).toMatchObject({
      id: 'task-test-id',
      goalId: 'goal-1',
      title: 'Новая задача',
      status: 'todo',
      priority: 'medium',
    });
  });

  it('updates a task fields', () => {
    useAppStore.getState().updateTask('task-1', {
      title: 'Обновленная задача',
      status: 'in-progress',
      priority: 'low',
    });

    expect(useAppStore.getState().tasks.find((task) => task.id === 'task-1')).toMatchObject({
      title: 'Обновленная задача',
      status: 'in-progress',
      priority: 'low',
    });
  });

  it('removes a task', () => {
    useAppStore.getState().removeTask('task-1');

    expect(useAppStore.getState().tasks.some((task) => task.id === 'task-1')).toBe(false);
  });

  it('resets store to the initial state', () => {
    useAppStore.getState().addGoal('Временная цель');

    resetAppStore();

    const state = useAppStore.getState();

    expect(state.goals).toHaveLength(2);
    expect(state.activeGoalId).toBe('goal-1');
  });
});
