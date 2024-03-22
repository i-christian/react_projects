export type FilterType = keyof typeof FILTER_MAP;

export const FILTER_MAP = {
  All: () => true,
  Active: (task: { completed: boolean }) => !task.completed,
  Completed: (task: { completed: boolean }) => task.completed,
};

export const FILTER_NAMES = Object.keys(FILTER_MAP) as FilterType[];
