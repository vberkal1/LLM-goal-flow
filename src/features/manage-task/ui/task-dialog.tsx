import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import type { TaskPriority, TaskStatus } from 'entities/task';

type TaskDialogProps = {
  open: boolean;
  title: string;
  taskTitle: string;
  status: TaskStatus;
  priority: TaskPriority;
  onClose: () => void;
  onSubmit: () => void;
  onTitleChange: (value: string) => void;
  onStatusChange: (value: TaskStatus) => void;
  onPriorityChange: (value: TaskPriority) => void;
};

export function TaskDialog({
  open,
  title,
  taskTitle,
  status,
  priority,
  onClose,
  onSubmit,
  onTitleChange,
  onStatusChange,
  onPriorityChange,
}: TaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            label="Название задачи"
            value={taskTitle}
            onChange={(event) => onTitleChange(event.target.value)}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Статус"
              value={status}
              onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
            >
              <MenuItem value="todo">To do</MenuItem>
              <MenuItem value="in-progress">In progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Приоритет"
              value={priority}
              onChange={(event) => onPriorityChange(event.target.value as TaskPriority)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onSubmit} disabled={!taskTitle.trim()}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
