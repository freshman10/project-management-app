import { ITaskConfig } from '../types/types';

export const transformTasksByOrder = (array: ITaskConfig[]): ITaskConfig[] => {
  return [...array].map((task, idx) => ({ ...task, order: idx }));
};
