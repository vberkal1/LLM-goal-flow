import type { ReactElement } from 'react';
import { useState } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppStore } from 'app/store/store';
import type { Goal } from 'entities/goal';
import type { Task, TaskPriority, TaskStatus } from 'entities/task';
import { TaskDialog } from './task-dialog';

type ManageTaskListProps = {
  activeGoal: Goal | null;
};

type TaskDialogState = {
  mode: 'create' | 'edit';
  taskId: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};

type StatusBadgeConfig = {
  label: string;
  icon: ReactElement;
  background: string;
  color: string;
};

const defaultTaskState: TaskDialogState = {
  mode: 'create',
  taskId: null,
  title: '',
  status: 'todo',
  priority: 'medium',
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

const TaskActions = styled(Box)({
  display: 'flex',
  flexShrink: 0,
});

const priorityColorMap: Record<TaskPriority, 'default' | 'warning' | 'error'> = {
  low: 'default',
  medium: 'warning',
  high: 'error',
};

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

function createEditState(task: Task): TaskDialogState {
  return {
    mode: 'edit',
    taskId: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
  };
}

function getDialogTitle(mode: 'create' | 'edit') {
  return mode === 'create' ? 'Новая задача' : 'Редактировать задачу';
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

  const openEditDialog = (task: Task) => {
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
                <Typography color="text.secondary">
                  CRUD задач в рамках выбранной цели.
                </Typography>
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
              <Typography color="text.secondary">
                Для этой цели пока нет задач. Добавьте первую задачу, чтобы начать работу.
              </Typography>
            ) : (
              <Stack divider={<Divider flexItem />} spacing={2}>
                {tasks.map((task) => {
                  const status = statusConfig[task.status];

                  return (
                    <Stack
                      key={task.id}
                      direction={{ xs: 'column', md: 'row' }}
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Stack spacing={1}>
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <StatusBadge
                            badgeBackground={status.background}
                            badgeColor={status.color}
                          >
                            {status.icon}
                            <span>{status.label}</span>
                          </StatusBadge>
                          <Chip
                            label={task.priority}
                            color={priorityColorMap[task.priority]}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Chip
                          icon={<AccessTimeRoundedIcon fontSize="small" />}
                          label={formatMinutes(task.timeSpent)}
                          size="small"
                          variant="outlined"
                        />
                        <TaskActions>
                          <Tooltip title="Редактировать">
                            <IconButton
                              onClick={() => openEditDialog(task)}
                              aria-label="Редактировать"
                            >
                              <EditRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton
                              onClick={() => removeTask(task.id)}
                              aria-label="Удалить"
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TaskActions>
                      </Stack>
                    </Stack>
                  );
                })}
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
