import { signUpSchema } from "@taxidi/shared-logic";
import * as z from 'zod';

export const signUpClientSchema = signUpSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});