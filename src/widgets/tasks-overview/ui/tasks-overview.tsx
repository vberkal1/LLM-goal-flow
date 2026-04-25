import type { ReactElement } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useAppStore } from 'app/store/store';
import type { Goal } from 'entities/goal';
import type { TaskStatus } from 'entities/task';

type TasksOverviewProps = {
  activeGoal: Goal | null;
};

const statusConfig: Record<
  TaskStatus,
  { label: string; icon: ReactElement; color: 'default' | 'primary' | 'success' }
> = {
  todo: {
    label: 'To do',
    icon: <RadioButtonUncheckedRoundedIcon fontSize="small" />,
    color: 'default',
  },
  'in-progress': {
    label: 'In progress',
    icon: <TrendingUpRoundedIcon fontSize="small" />,
    color: 'primary',
  },
  done: {
    label: 'Done',
    icon: <CheckCircleRoundedIcon fontSize="small" />,
    color: 'success',
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
            {tasks.map((task) => (
              <Stack
                key={task.id}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                spacing={2}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle1">{task.title}</Typography>
                  <Chip
                    icon={statusConfig[task.status].icon}
                    label={statusConfig[task.status].label}
                    color={statusConfig[task.status].color}
                    variant={task.status === 'todo' ? 'outlined' : 'filled'}
                  />
                </Stack>
                <Chip
                  icon={<AccessTimeRoundedIcon fontSize="small" />}
                  label={formatMinutes(task.timeSpent)}
                  variant="outlined"
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
