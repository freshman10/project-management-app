import * as yup from 'yup';

export const addColumnSchema = yup.object().shape({
  title: yup.string().required('title is required'),
});
