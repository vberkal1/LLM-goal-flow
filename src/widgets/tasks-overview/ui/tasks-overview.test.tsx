import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from 'test/render';
import type { Goal } from 'entities/goal';
import { TasksOverview } from './tasks-overview';

const activeGoal: Goal = {
  id: 'goal-1',
  title: 'Запустить MVP GoalFlow',
  createdAt: '2026-04-25T09:00:00.000Z',
  updatedAt: '2026-04-25T09:00:00.000Z',
};

describe('TasksOverview', () => {
  it('renders tasks for the selected goal', () => {
    renderWithProviders(<TasksOverview activeGoal={activeGoal} />);

    expect(screen.getByText('Запустить MVP GoalFlow')).toBeInTheDocument();
    expect(screen.getByText('Собрать базовую структуру проекта')).toBeInTheDocument();
    expect(screen.getByText('Подготовить store и layout dashboard')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('shows the empty active goal state', () => {
    renderWithProviders(<TasksOverview activeGoal={null} />);

    expect(screen.getByText('Нет активной цели')).toBeInTheDocument();
  });
});
