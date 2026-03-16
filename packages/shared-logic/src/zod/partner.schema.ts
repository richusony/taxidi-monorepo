import { z } from 'zod';

export const partnerSchema = z.object({
  firstname: z.string().min(2, 'First name is too short'),
  lastname: z.string().optional(),
  email: z.email('Invalid email format'),
  //   phone: z
  //     .string()
  //     .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  //     .optional()
});
