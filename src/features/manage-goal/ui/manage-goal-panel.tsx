import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import { GoalDialog } from './goal-dialog';

type GoalDialogMode = 'create' | 'edit';

type GoalDialogState = {
  mode: GoalDialogMode;
  goalId: string | null;
  title: string;
};

const initialDialogState: GoalDialogState = {
  mode: 'create',
  goalId: null,
  title: '',
};

const Header = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

const AddButton = styled(Button)({
  alignSelf: 'flex-start',
  flexShrink: 0,
});

const GoalActions = styled(Box)({
  display: 'flex',
  flexShrink: 0,
});

const GoalText = styled(Box)({
  flex: 1,
  minWidth: 0,
});

const GoalPrimaryText = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

function getDialogTitle(mode: GoalDialogMode) {
  return mode === 'create' ? 'Новая цель' : 'Переименовать цель';
}

export function ManageGoalPanel() {
  const goals = useAppStore((state) => state.goals);
  const activeGoalId = useAppStore((state) => state.activeGoalId);
  const addGoal = useAppStore((state) => state.addGoal);
  const setActiveGoal = useAppStore((state) => state.setActiveGoal);
  const updateGoal = useAppStore((state) => state.updateGoal);
  const removeGoal = useAppStore((state) => state.removeGoal);
  const [dialogState, setDialogState] = useState<GoalDialogState>(initialDialogState);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openCreateDialog = () => {
    setDialogState(initialDialogState);
    setDialogOpen(true);
  };

  const openEditDialog = (goalId: string, title: string) => {
    setDialogState({ mode: 'edit', goalId, title });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogState(initialDialogState);
  };

  const submitDialog = () => {
    if (dialogState.mode === 'create') {
      addGoal(dialogState.title);
    }

    if (dialogState.mode === 'edit' && dialogState.goalId) {
      updateGoal(dialogState.goalId, dialogState.title);
    }

    closeDialog();
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Header>
              <div>
                <Typography variant="h6">Goals</Typography>
                <Typography color="text.secondary">
                  Создание, выбор и управление активной целью.
                </Typography>
              </div>
              <AddButton
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={openCreateDialog}
              >
                Add
              </AddButton>
            </Header>
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
                  <GoalText>
                    <Tooltip title={goal.title} placement="top-start">
                      <ListItemText primary={<GoalPrimaryText>{goal.title}</GoalPrimaryText>} />
                    </Tooltip>
                  </GoalText>
                  <GoalActions>
                    <Tooltip title="Переименовать">
                      <IconButton
                        edge="end"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditDialog(goal.id, goal.title);
                        }}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        edge="end"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeGoal(goal.id);
                        }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </GoalActions>
                </ListItemButton>
              ))}
            </List>
            {goals.length === 0 && (
              <Typography color="text.secondary">
                Пока нет целей. Создайте первую, чтобы продолжить работу.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
      <GoalDialog
        open={isDialogOpen}
        title={getDialogTitle(dialogState.mode)}
        value={dialogState.title}
        onClose={closeDialog}
        onSubmit={submitDialog}
        onChange={(title) => setDialogState((state) => ({ ...state, title }))}
      />
    </>
  );
}
