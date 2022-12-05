import * as yup from 'yup';
import { signInSchema } from './signInSchema';

export const signUpSchema = yup
  .object()
  .shape({
    name: yup.string().required('name is required'),
    agree: yup.boolean().oneOf([true], 'you need to confirm'),
  })
  .concat(signInSchema);
