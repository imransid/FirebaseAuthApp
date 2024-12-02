/* All form validations will resides here */

import * as yup from 'yup';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

export const mobileSignInFormValidation = yup.object().shape({
  mobile: yup.string().required('Mobile Number is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must contain at least 8 characters')
});


export const createAccountFormValidation = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  mobile: yup.string().required('Mobile Number is required'),
  email: yup.string().required('Email Address is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'), // Changed from 4 to 8 to match the message
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), ''], 'The password is not matched'), // Check if it matches the password
  gender: yup.string().required('Gender is required'),
  birthDate: yup.string().required('Birth Date is required')
});

// export const OTPFormValidation = Yup.object({
//   otp: Yup.string()
//     .required('Otp is required')
//     .max(6, 'Otp must be at least 6 characters')
//     .min(6, 'Otp must be at more 6 characters')
// });
