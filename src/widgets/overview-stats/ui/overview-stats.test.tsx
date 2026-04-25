import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from 'test/render';
import { OverviewStats } from './overview-stats';

describe('OverviewStats', () => {
  it('shows counters for the active goal', () => {
    renderWithProviders(<OverviewStats activeGoalId="goal-1" />);

    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('125m')).toBeInTheDocument();
  });
});
