import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useAppStore } from 'app/store/store';
import type { Goal } from 'entities/goal';
import { renderWithProviders } from 'test/render';
import { ManageTaskList } from './manage-task-list';

const activeGoal: Goal = {
  id: 'goal-1',
  title: 'Запустить MVP GoalFlow',
  createdAt: '2026-04-25T09:00:00.000Z',
  updatedAt: '2026-04-25T09:00:00.000Z',
};

describe('ManageTaskList', () => {
  it('creates a new task for the active goal', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageTaskList activeGoal={activeGoal} />);

    await user.click(screen.getByRole('button', { name: /add task/i }));
    await user.type(screen.getByLabelText('Название задачи'), 'Новая задача');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => {
      expect(screen.queryByLabelText('Название задачи')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(useAppStore.getState().tasks[0]?.goalId).toBe('goal-1');
  });

  it('updates an existing task', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageTaskList activeGoal={activeGoal} />);

    await user.click(screen.getAllByRole('button', { name: 'Редактировать' })[0]!);
    const input = screen.getByLabelText('Название задачи');

    await user.clear(input);
    await user.type(input, 'Обновленная задача');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(screen.getByText('Обновленная задача')).toBeInTheDocument();
  });

  it('removes a task from the active goal list', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageTaskList activeGoal={activeGoal} />);

    await user.click(screen.getAllByRole('button', { name: 'Удалить' })[0]!);

    await waitFor(() => {
      expect(screen.queryByText('Собрать базовую структуру проекта')).not.toBeInTheDocument();
    });
    expect(useAppStore.getState().tasks.some((task) => task.id === 'task-1')).toBe(false);
  });

  it('shows an empty state when there are no tasks in the goal', () => {
    renderWithProviders(
      <ManageTaskList
        activeGoal={{
          id: 'goal-unknown',
          title: 'Пустая цель',
          createdAt: '',
          updatedAt: '',
        }}
      />,
    );

    expect(
      screen.getByText('Для этой цели пока нет задач. Добавьте первую задачу, чтобы начать работу.'),
    ).toBeInTheDocument();
  });
});
