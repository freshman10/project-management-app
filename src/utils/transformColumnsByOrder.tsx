import { IColumn } from '../types/types';

export const transformColumnsByOrder = (array: IColumn[]): IColumn[] => {
  return [...array].map((column, idx) => ({ ...column, order: idx }));
};
