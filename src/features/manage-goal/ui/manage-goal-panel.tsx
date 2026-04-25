import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Card, CardContent, List, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import { getGoalEmptyState, getGoalPanelDescription } from '../lib/goal-text';
import {
  createEditGoalState,
  getGoalDialogTitle,
  initialDialogState,
} from '../model/goal-dialog-state';
import type { GoalDialogState } from '../model/types';
import { GoalDialog } from './goal-dialog';
import { GoalListItem } from './goal-list-item';

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

export function ManageGoalPanel() {
  const goals = useAppStore((state) => state.goals);
  const activeGoalId = useAppStore((state) => state.activeGoalId);
  const addGoal = useAppStore((state) => state.addGoal);
  const setActiveGoal = useAppStore((state) => state.setActiveGoal);
  const updateGoal = useAppStore((state) => state.updateGoal);
  const removeGoal = useAppStore((state) => state.removeGoal);
  const [dialogState, setDialogState] = useState<GoalDialogState>(initialDialogState);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const emptyState = getGoalEmptyState(goals);

  const openCreateDialog = () => {
    setDialogState(initialDialogState);
    setDialogOpen(true);
  };

  const openEditDialog = (goalId: string, title: string) => {
    setDialogState(createEditGoalState(goalId, title));
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
                <Typography color="text.secondary">{getGoalPanelDescription()}</Typography>
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
                <GoalListItem
                  key={goal.id}
                  goal={goal}
                  isActive={goal.id === activeGoalId}
                  onSelect={setActiveGoal}
                  onEdit={openEditDialog}
                  onRemove={removeGoal}
                />
              ))}
            </List>
            {emptyState && <Typography color="text.secondary">{emptyState}</Typography>}
          </Stack>
        </CardContent>
      </Card>
      <GoalDialog
        open={isDialogOpen}
        title={getGoalDialogTitle(dialogState.mode)}
        value={dialogState.title}
        onClose={closeDialog}
        onSubmit={submitDialog}
        onChange={(title) => setDialogState((state) => ({ ...state, title }))}
      />
    </>
  );
}
