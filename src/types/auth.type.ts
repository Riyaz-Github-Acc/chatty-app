import type { z } from "zod";

import type { LoginFormSchema, SignupFormSchema } from "../validators/auth.validator";

export type LoginUserProps = z.infer<typeof LoginFormSchema>
export type SignupUserProps = z.infer<typeof SignupFormSchema>

export interface UserResProps {
    success: boolean,
    message: string,
    record: AuthUserProps[]
}

export interface AuthUserProps {
    id: string;
    username: string;
    email: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthFormTypeProps {
    type: 'signup' | 'login'
}
