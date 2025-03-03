/* All form validations will resides here */

import * as yup from 'yup';
import {parse, isValid} from 'date-fns';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

export const signInFormValidation = yup.object().shape({
  email: yup
    .string()
    .required('Email Address is required')
    .test(
      'starts-with-lowercase',
      'Email must start with a lowercase letter',
      value => (value ? /^[a-z]/.test(value) : true), // Check if it starts with a lowercase letter
    )
    .test(
      'contains-at',
      'Email must contain "@"',
      value => (value ? /@/.test(value) : true), // Check if it contains the "@" symbol
    )
    .test(
      'valid-email-format',
      'Invalid email format',
      value =>
        value
          ? /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
          : true, // Full email format validation as a fallback
    ),

  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must contain at least 8 characters'),
});

export const signUpFormValidation = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name must only contain letters and spaces'), // Only allow letters and spaces,
  lastName: yup
    .string()
    .required('Last Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name must only contain letters and spaces'), // Only allow letters and spaces,
  mobileNumber: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^\d+$/, 'Mobile Number must contain only digits') // Allow only numeric characters
    .min(11, 'Mobile Number must contain at least 11 Digits'),
  email: yup
    .string()
    .required('Email Address is required')
    .test(
      'starts-with-lowercase',
      'Email must start with a lowercase letter',
      value => (value ? /^[a-z]/.test(value) : true), // Check if it starts with a lowercase letter
    )
    .test(
      'contains-at',
      'Email must contain "@"',
      value => (value ? /@/.test(value) : true), // Check if it contains the "@" symbol
    )
    .test(
      'valid-email-format',
      'Invalid email format',
      value =>
        value
          ? /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
          : true, // Full email format validation as a fallback
    ),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'), // Changed from 4 to 8 to match the message
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), ''], 'The password is not matched'), // Check if it matches the password
  // gender: yup.string().required('Gender is required'),
  // birthDate: yup
  //   .string()
  //   .required('Birth Date is required')
  //   .test('is-not-future-date', 'Birth Date cannot be in the future', value => {
  //     if (!value) return true;
  //     const selectedDate = parse(value, 'EEE, MMMM dd, yyyy', new Date());
  //     if (!isValid(selectedDate)) return false;
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     return selectedDate <= today;
  //   }),
  role: yup
    .string()
    .required('Role is required')
    .oneOf(
      ['student', 'teacher'],
      'Role must be either "student" or "teacher"',
    ),

  batchStatus: yup.string().required('batchStatus is required'),
});

// export const signUpFormValidation = yup.object().shape({
//   firstName: yup
//     .string()
//     .required('First Name is required')
//     .min(2, 'First Name must be at least 2 characters long')
//     .max(50, 'First Name cannot be longer than 50 characters'),

//   lastName: yup
//     .string()
//     .required('Last Name is required')
//     .min(2, 'Last Name must be at least 2 characters long')
//     .max(50, 'Last Name cannot be longer than 50 characters'),

//   email: yup
//     .string()
//     .required('Email Address is required')
//     .email('Invalid email format')
//     .test(
//       'starts-with-lowercase',
//       'Email must start with a lowercase letter',
//       value => (value ? /^[a-z]/.test(value) : true),
//     )
//     .test('contains-at', 'Email must contain "@"', value =>
//       value ? /@/.test(value) : true,
//     ),

//   password: yup
//     .string()
//     .required('Password is required')
//     .min(8, 'Password must contain at least 8 characters')
//     .max(20, 'Password cannot be longer than 20 characters')
//     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//     .matches(/[0-9]/, 'Password must contain at least one number')
//     .matches(
//       /[@$!%*?&]/,
//       'Password must contain at least one special character',
//     ),

//   mobileNumber: yup
//     .string()
//     .required('Mobile Number is required')
//     .matches(/^[0-9]{10}$/, 'Mobile Number must be a 10-digit number'),

//   role: yup
//     .string()
//     .required('Role is required')
//     .oneOf(
//       ['student', 'teacher'],
//       'Role must be either "student" or "teacher"',
//     ),
// });
