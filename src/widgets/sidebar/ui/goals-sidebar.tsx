import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useAppStore } from 'app/store/store';

type GoalsSidebarProps = {
  activeGoalId: string | null;
};

export function GoalsSidebar({ activeGoalId }: GoalsSidebarProps) {
  const goals = useAppStore((state) => state.goals);
  const setActiveGoal = useAppStore((state) => state.setActiveGoal);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Typography variant="h6">Goals</Typography>
            <Typography color="text.secondary">
              Выбор активной цели для дальнейшей работы.
            </Typography>
          </div>
          <List disablePadding>
            {goals.map((goal) => (
              <ListItemButton
                key={goal.id}
                selected={goal.id === activeGoalId}
                onClick={() => setActiveGoal(goal.id)}
              >
                <ListItemIcon>
                  <FlagRoundedIcon color={goal.id === activeGoalId ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary={goal.title} />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
