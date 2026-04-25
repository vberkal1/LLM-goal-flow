import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import type { Goal } from 'entities/goal';
import { createEditState, defaultTaskState, getDialogTitle } from '../model/task-dialog-state';
import type { TaskDialogState } from '../model/types';
import { TaskListItem } from './task-list-item';
import { TaskDialog } from './task-dialog';

type ManageTaskListProps = {
  activeGoal: Goal | null;
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

function getTaskDescription(activeGoal: Goal | null) {
  return activeGoal
    ? 'CRUD задач в рамках выбранной цели.'
    : 'Выберите цель, чтобы управлять задачами.';
}

function getEmptyState(activeGoal: Goal | null) {
  return activeGoal
    ? 'Для этой цели пока нет задач. Добавьте первую задачу, чтобы начать работу.'
    : 'Нет активной цели. Сначала выберите или создайте цель.';
}

export function ManageTaskList({ activeGoal }: ManageTaskListProps) {
  const addTask = useAppStore((state) => state.addTask);
  const removeTask = useAppStore((state) => state.removeTask);
  const allTasks = useAppStore((state) => state.tasks);
  const updateTask = useAppStore((state) => state.updateTask);
  const tasks = allTasks.filter((task) => !activeGoal?.id || task.goalId === activeGoal.id);
  const [dialogState, setDialogState] = useState<TaskDialogState>(defaultTaskState);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogState(defaultTaskState);
  };

  const openCreateDialog = () => {
    setDialogState(defaultTaskState);
    setDialogOpen(true);
  };

  const openEditDialog = (taskId: string) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) {
      return;
    }

    setDialogState(createEditState(task));
    setDialogOpen(true);
  };

  const submitDialog = () => {
    if (dialogState.mode === 'create') {
      addTask(dialogState);
    }

    if (dialogState.mode === 'edit' && dialogState.taskId) {
      updateTask(dialogState.taskId, dialogState);
    }

    closeDialog();
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Header>
              <div>
                <Typography variant="h6">
                  {activeGoal ? activeGoal.title : 'Нет активной цели'}
                </Typography>
                <Typography color="text.secondary">{getTaskDescription(activeGoal)}</Typography>
              </div>
              <AddButton
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={openCreateDialog}
                disabled={!activeGoal}
              >
                Add task
              </AddButton>
            </Header>
            {tasks.length === 0 ? (
              <Typography color="text.secondary">{getEmptyState(activeGoal)}</Typography>
            ) : (
              <Stack divider={<Divider flexItem />} spacing={2}>
                {tasks.map((task) => (
                  <TaskListItem
                    key={task.id}
                    task={task}
                    onEdit={(item) => openEditDialog(item.id)}
                    onRemove={removeTask}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
      <TaskDialog
        open={isDialogOpen}
        title={getDialogTitle(dialogState.mode)}
        taskTitle={dialogState.title}
        status={dialogState.status}
        priority={dialogState.priority}
        onClose={closeDialog}
        onSubmit={submitDialog}
        onTitleChange={(title) => setDialogState((state) => ({ ...state, title }))}
        onStatusChange={(status) => setDialogState((state) => ({ ...state, status }))}
        onPriorityChange={(priority) => setDialogState((state) => ({ ...state, priority }))}
      />
    </>
  );
}
