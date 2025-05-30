import { z } from 'zod';

export const LoginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email field cannot be empty.' })
        .email('Invalid email format'),
    password: z
        .string()
        .min(8, { message: 'Password should be at least 8 characters.' }),
});

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(1, { message: 'Username field cannot be empty.' }),
    email: z
        .string()
        .min(1, { message: 'Email field cannot be empty.' })
        .email('Invalid email format'),
    password: z
        .string()
        .min(8, { message: 'Password should be at least 8 characters.' }),
});
