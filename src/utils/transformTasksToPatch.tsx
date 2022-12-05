import { ITaskConfig, ITasksPatch } from '../types/types';

export const transformTasksToPatch = (
  array: ITaskConfig[],
  newColumnId?: string
): ITasksPatch[] => {
  return [...array].map((task: ITaskConfig) => ({
    _id: task._id || '',
    order: task.order,
    columnId: newColumnId || task.columnId || '',
  }));
};
