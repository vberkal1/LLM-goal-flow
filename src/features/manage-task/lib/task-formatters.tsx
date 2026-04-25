import type { ReactElement } from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import type { TaskPriority, TaskStatus } from 'entities/task';

export type StatusBadgeConfig = {
  label: string;
  icon: ReactElement;
  background: string;
  color: string;
};

export const priorityColorMap: Record<TaskPriority, 'default' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'warning',
  high: 'error',
};

export const statusConfig: Record<TaskStatus, StatusBadgeConfig> = {
  todo: {
    label: 'To do',
    icon: <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 14 }} />,
    background: '#eef2f7',
    color: '#526075',
  },
  'in-progress': {
    label: 'In progress',
    icon: <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />,
    background: '#e8efff',
    color: '#2457f5',
  },
  done: {
    label: 'Done',
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 14 }} />,
    background: '#e7f7ef',
    color: '#127a4a',
  },
};

export function formatMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
}
