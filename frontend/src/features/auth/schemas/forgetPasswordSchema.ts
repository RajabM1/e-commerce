import { z } from "zod";

export const forgetPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export type forgetPasswordForm = z.infer<typeof forgetPasswordSchema>;
