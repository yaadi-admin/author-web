import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  type: z.string().optional(),
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  isAgreed: z.boolean().optional(),
  role: z.enum(['seller', 'buyer', 'provider', 'broker', 'advisor', 'client']),
});

export const successionSignUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  isAgreed: z.boolean().optional(),
});

export const sellerSignupSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  birthDate: z.date({
    required_error: messages.birthDateRequired,
  }),
  phoneNumber: z.string().optional(),
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  isAgreed: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SuccessionSignUpSchema = z.infer<typeof successionSignUpSchema>;

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
// generate form types from zod validation schema
export type SellerSignUpSchema = z.infer<typeof sellerSignupSchema>;
