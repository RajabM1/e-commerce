import { z } from "zod";

export const categorySchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Category Name is required"),
    image: z.string().min(1, "Category Image is required"),
});

export type Category = z.infer<typeof categorySchema>;
