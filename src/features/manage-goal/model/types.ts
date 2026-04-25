export type GoalDialogMode = 'create' | 'edit';

export type GoalDialogState = {
  mode: GoalDialogMode;
  goalId: string | null;
  title: string;
};
