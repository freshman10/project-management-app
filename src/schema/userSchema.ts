import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().min(3, 'name should have a minimum length of 3').required('name is required'),
  login: yup
    .string()
    .min(3, 'login should have a minimum length of 3')
    .required('login is required'),
  password: yup
    .string()
    .min(5, 'password should have a minimum length of 5')
    .max(12, 'password should have a maximum length of 12')
    .notRequired()
    .nullable()
    .transform((value) => (!!value ? value : null)),
});
