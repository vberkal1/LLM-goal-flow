import type { ReactElement } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import type { Goal } from 'entities/goal';
import type { TaskStatus } from 'entities/task';

type TasksOverviewProps = {
  activeGoal: Goal | null;
};

type StatusBadgeConfig = {
  label: string;
  icon: ReactElement;
  background: string;
  color: string;
};

const StatusBadge = styled('span')<{ badgeColor: string; badgeBackground: string }>(
  ({ badgeColor, badgeBackground, theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    width: 'fit-content',
    borderRadius: 999,
    padding: theme.spacing(0.5, 1),
    backgroundColor: badgeBackground,
    color: badgeColor,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  }),
);

const statusConfig: Record<TaskStatus, StatusBadgeConfig> = {
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

function formatMinutes(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
}

export function TasksOverview({ activeGoal }: TasksOverviewProps) {
  const getTasksByGoalId = useAppStore((state) => state.getTasksByGoalId);
  const tasks = getTasksByGoalId(activeGoal?.id ?? null);

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <div>
            <Typography variant="h6">
              {activeGoal ? activeGoal.title : 'Нет активной цели'}
            </Typography>
            <Typography color="text.secondary">
              Базовый список задач для текущей цели.
            </Typography>
          </div>
          <Stack divider={<Divider flexItem />} spacing={2}>
            {tasks.map((task) => {
              const status = statusConfig[task.status];

              return (
                <Stack
                  key={task.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">{task.title}</Typography>
                    <StatusBadge
                      badgeBackground={status.background}
                      badgeColor={status.color}
                    >
                      {status.icon}
                      <span>{status.label}</span>
                    </StatusBadge>
                  </Stack>
                  <Chip
                    icon={<AccessTimeRoundedIcon fontSize="small" />}
                    label={formatMinutes(task.timeSpent)}
                    variant="outlined"
                  />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
