import { z } from "zod";

export const itemSchema = z.object({
    id: z.number(),
    name: z.string(),
    barcode: z.string().optional(),
    price: z.number(),
    description: z.string().optional(),
    image: z.string(),
    quantity: z.number().optional(),
    discount: z.number(),
    category: z.string(),
});

export type Item = z.infer<typeof itemSchema>;
