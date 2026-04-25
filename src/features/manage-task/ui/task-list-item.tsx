import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Task } from 'entities/task';
import { formatMinutes, priorityColorMap, statusConfig } from '../lib/task-formatters';

type TaskListItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onRemove: (taskId: string) => void;
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

const TaskActions = styled(Box)({
  display: 'flex',
  flexShrink: 0,
});

export function TaskListItem({ task, onEdit, onRemove }: TaskListItemProps) {
  const status = statusConfig[task.status];

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle1">{task.title}</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <StatusBadge badgeBackground={status.background} badgeColor={status.color}>
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
            <IconButton onClick={() => onEdit(task)} aria-label="Редактировать">
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton onClick={() => onRemove(task.id)} aria-label="Удалить">
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TaskActions>
      </Stack>
    </Stack>
  );
}
