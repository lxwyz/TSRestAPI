import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3).max(8).trim(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
})