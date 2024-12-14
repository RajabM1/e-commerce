import { z } from "zod";

export const registerSchema = z
    .object({
        username: z.string().min(1, "Username is required"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type registerForm = z.infer<typeof registerSchema>;
