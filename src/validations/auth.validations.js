import * as yup from 'yup';

export const authValidation = yup.object({
  email: yup.string().required().email().min(8),
  password: yup.string().required().min(8),
})