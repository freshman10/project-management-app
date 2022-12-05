import * as yup from 'yup';

export const boardSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'title should have a minimum length of 3')
    .required('title is required'),
  description: yup
    .string()
    .min(5, 'description should have a minimum length of 5')
    .required('description is required'),
});
