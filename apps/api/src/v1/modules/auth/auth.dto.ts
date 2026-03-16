import { signInSchema, signUpSchema } from '@taxidi/shared-logic';
import z from 'zod';

export type SignUpInputDto = z.infer<typeof signUpSchema>;

export type SignInInputDto = z.infer<typeof signInSchema>;
