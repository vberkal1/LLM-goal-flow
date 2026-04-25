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

  it('resets store to the initial state', () => {
    useAppStore.getState().addGoal('Временная цель');

    resetAppStore();

    const state = useAppStore.getState();

    expect(state.goals).toHaveLength(2);
    expect(state.activeGoalId).toBe('goal-1');
  });
});
