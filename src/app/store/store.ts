import { create } from 'zustand';
import type { Goal } from 'entities/goal';
import type { Task, TaskPriority, TaskStatus } from 'entities/task';

type GoalSlice = {
  goals: Goal[];
  activeGoalId: string | null;
  addGoal: (title: string) => void;
  setActiveGoal: (goalId: string) => void;
  updateGoal: (goalId: string, title: string) => void;
  removeGoal: (goalId: string) => void;
};

type TaskSlice = {
  tasks: Task[];
  getTasksByGoalId: (goalId: string | null) => Task[];
};

type UiSlice = {
  viewMode: 'list';
};

export type AppStore = GoalSlice & TaskSlice & UiSlice;

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function createTimestamp() {
  return new Date().toISOString();
}

const createTask = (
  id: string,
  goalId: string,
  title: string,
  status: TaskStatus,
  priority: TaskPriority,
  timeSpent: number,
): Task => ({
  id,
  goalId,
  title,
  status,
  priority,
  tags: [],
  timeSpent,
  createdAt: '2026-04-25T10:00:00.000Z',
  updatedAt: '2026-04-25T10:00:00.000Z',
});

const initialGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Запустить MVP GoalFlow',
    createdAt: '2026-04-25T09:00:00.000Z',
    updatedAt: '2026-04-25T09:00:00.000Z',
  },
  {
    id: 'goal-2',
    title: 'Стабилизировать рабочий процесс',
    createdAt: '2026-04-25T09:30:00.000Z',
    updatedAt: '2026-04-25T09:30:00.000Z',
  },
];

const initialTasks: Task[] = [
  createTask('task-1', 'goal-1', 'Собрать базовую структуру проекта', 'done', 'high', 90),
  createTask('task-2', 'goal-1', 'Подготовить store и layout dashboard', 'in-progress', 'high', 35),
  createTask('task-3', 'goal-2', 'Определить ежедневный ритм работы', 'todo', 'medium', 0),
];

export const useAppStore = create<AppStore>((set, get) => ({
  goals: initialGoals,
  activeGoalId: initialGoals[0]?.id ?? null,
  addGoal: (title) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const timestamp = createTimestamp();
    const goal: Goal = {
      id: createId('goal'),
      title: trimmedTitle,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    set((state) => ({
      goals: [goal, ...state.goals],
      activeGoalId: goal.id,
    }));
  },
  setActiveGoal: (goalId) => set({ activeGoalId: goalId }),
  updateGoal: (goalId, title) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, title: trimmedTitle, updatedAt: createTimestamp() }
          : goal,
      ),
    }));
  },
  removeGoal: (goalId) =>
    set((state) => {
      const goals = state.goals.filter((goal) => goal.id !== goalId);
      const activeGoalId =
        state.activeGoalId === goalId ? goals[0]?.id ?? null : state.activeGoalId;

      return {
        goals,
        activeGoalId,
        tasks: state.tasks.filter((task) => task.goalId !== goalId),
      };
    }),
  tasks: initialTasks,
  getTasksByGoalId: (goalId) =>
    get().tasks.filter((task) => !goalId || task.goalId === goalId),
  viewMode: 'list',
}));
