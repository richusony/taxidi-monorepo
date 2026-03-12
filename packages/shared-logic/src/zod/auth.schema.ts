import { z } from 'zod';

export const signUpSchema = z.object({
  firstname: z.string().min(2, 'First name is too short'),
  lastname: z.string().optional(),
  email: z.email('Invalid email format'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signInSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(3, 'Invalid credentials').nonempty('Use proper credentials'),
});
