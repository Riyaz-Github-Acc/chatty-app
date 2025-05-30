import { z } from "zod";

import type { PostMessageSchema } from "../validators/message.validator";

export interface MessageResProps {
    success: boolean,
    message: string,
    record: MessageDetailsProps[]
}

export type MessageFormProps = z.infer<typeof PostMessageSchema>;

export interface MessageDetailsProps {
    id: string
    senderId: string,
    receiverId: string,
    text?: string,
    image?: string,
    createdAt: Date,
    updatedAt: Date,
}