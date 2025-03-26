import { z } from "zod"

export const taskSchema = z.object({
    title: z.string().min(3, "Title minimal 3 karakter").max(100, "Title maksimal 100 karakter"),
    description: z.string().optional(),
    completed: z.boolean().default(false),
})