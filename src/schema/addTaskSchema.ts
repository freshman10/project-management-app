import * as yup from 'yup';
import { addColumnSchema } from './addColumnSchema';

export const addTaskSchema = yup
  .object()
  .shape({
    description: yup.string().required('description is required'),
  })
  .concat(addColumnSchema);
