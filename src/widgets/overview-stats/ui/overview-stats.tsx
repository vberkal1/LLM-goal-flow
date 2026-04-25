import { Grid } from '@mui/material';
import { useAppStore } from 'app/store/store';
import { StatCard } from 'shared/ui/stat-card';

type OverviewStatsProps = {
  activeGoalId: string | null;
};

function getProgress(doneTasks: number, totalTasks: number) {
  if (totalTasks === 0) {
    return 0;
  }

  return Math.round((doneTasks / totalTasks) * 100);
}

export function OverviewStats({ activeGoalId }: OverviewStatsProps) {
  const getTasksByGoalId = useAppStore((state) => state.getTasksByGoalId);
  const tasks = getTasksByGoalId(activeGoalId);
  const doneTasks = tasks.filter((task) => task.status === 'done').length;
  const totalMinutes = tasks.reduce((sum, task) => sum + task.timeSpent, 0);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard label="Tasks" value={tasks.length.toString()} helper="Всего в активной цели" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard label="Progress" value={`${getProgress(doneTasks, tasks.length)}%`} helper="Выполнено по задачам" />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatCard label="Focus time" value={`${totalMinutes}m`} helper="Накопленное время" />
      </Grid>
    </Grid>
  );
}
