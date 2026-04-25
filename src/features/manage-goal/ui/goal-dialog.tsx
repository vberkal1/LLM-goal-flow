import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

type GoalDialogProps = {
  open: boolean;
  title: string;
  value: string;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (value: string) => void;
};

export function GoalDialog({
  open,
  title,
  value,
  onClose,
  onSubmit,
  onChange,
}: GoalDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Название цели"
          margin="dense"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={onSubmit} disabled={!value.trim()}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
