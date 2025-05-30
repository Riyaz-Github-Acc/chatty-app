import { z } from "zod";

export const PostMessageSchema = z.object({
    text: z.string().optional(),
    image: z
        .string()
        .optional()
        .refine(
            (val) => !val || val.startsWith("data:image/"),
            { message: "Invalid image format" }
        ),
});

