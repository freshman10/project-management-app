import { IColumn, IColumnPatch } from '../types/types';

export const transformColumnToPatch = (array: IColumn[]): IColumnPatch[] => {
  return [...array].map((column: IColumn) => ({
    _id: column._id || '',
    order: column.order,
  }));
};
