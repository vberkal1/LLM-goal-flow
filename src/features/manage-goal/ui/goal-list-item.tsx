import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Goal } from 'entities/goal';

type GoalListItemProps = {
  goal: Goal;
  isActive: boolean;
  onSelect: (goalId: string) => void;
  onEdit: (goalId: string, title: string) => void;
  onRemove: (goalId: string) => void;
};

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

export function GoalListItem({
  goal,
  isActive,
  onSelect,
  onEdit,
  onRemove,
}: GoalListItemProps) {
  return (
    <ListItemButton selected={isActive} onClick={() => onSelect(goal.id)}>
      <ListItemIcon>
        <FlagRoundedIcon color={isActive ? 'primary' : 'action'} />
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
              onEdit(goal.id, goal.title);
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
              onRemove(goal.id);
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </GoalActions>
    </ListItemButton>
  );
}
