import { Box, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import { ManageGoalPanel } from 'features/manage-goal';
import { ManageTaskList } from 'features/manage-task';
import { OverviewStats } from 'widgets/overview-stats';

const Shell = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background:
    'radial-gradient(circle at top, rgba(36, 87, 245, 0.12), transparent 35%), #f4f6fb',
  padding: theme.spacing(4),
}));

const Header = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  gap: theme.spacing(1),
}));

export function AppShell() {
  const goals = useAppStore((state) => state.goals);
  const activeGoalId = useAppStore((state) => state.activeGoalId);
  const activeGoal = goals.find((goal) => goal.id === activeGoalId) ?? goals[0] ?? null;

  return (
    <Shell>
      <Header>
        <Typography variant="overline" color="primary">
          GoalFlow
        </Typography>
        <Typography variant="h4">Dashboard</Typography>
        <Typography color="text.secondary">
          Milestone 3: CRUD задач и list view для активной цели.
        </Typography>
      </Header>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <ManageGoalPanel />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <Stack spacing={3}>
            <OverviewStats activeGoalId={activeGoal?.id ?? null} />
            <ManageTaskList activeGoal={activeGoal} />
          </Stack>
        </Grid>
      </Grid>
    </Shell>
  );
}
