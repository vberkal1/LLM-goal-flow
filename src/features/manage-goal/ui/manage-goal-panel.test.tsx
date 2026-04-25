import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useAppStore } from 'app/store/store';
import { renderWithProviders } from 'test/render';
import { ManageGoalPanel } from './manage-goal-panel';

describe('ManageGoalPanel', () => {
  it('creates a new goal from the dialog', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageGoalPanel />);

    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(screen.getByLabelText('Название цели'), 'Новая цель');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('heading', { name: 'Новая цель' }),
    );

    expect(screen.getByRole('button', { name: 'Новая цель' })).toBeInTheDocument();
    expect(useAppStore.getState().activeGoalId).toBe(useAppStore.getState().goals[0]?.id);
  });

  it('renames an existing goal', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageGoalPanel />);

    await user.click(screen.getAllByRole('button', { name: 'Переименовать' })[0]!);
    const input = screen.getByLabelText('Название цели');

    await user.clear(input);
    await user.type(input, 'Обновленная цель');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(screen.getByText('Обновленная цель')).toBeInTheDocument();
  });

  it('removes a goal from the list', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageGoalPanel />);

    await user.click(screen.getAllByRole('button', { name: 'Удалить' })[1]!);

    expect(screen.queryByText('Стабилизировать рабочий процесс')).not.toBeInTheDocument();
    expect(useAppStore.getState().goals).toHaveLength(1);
  });

  it('switches the active goal when a list item is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ManageGoalPanel />);

    await user.click(screen.getByRole('button', { name: 'Стабилизировать рабочий процесс' }));

    expect(useAppStore.getState().activeGoalId).toBe('goal-2');
  });
});
