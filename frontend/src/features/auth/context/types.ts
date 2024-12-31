import { loginForm } from "../schemas/loginSchema";
import { registerForm } from "../schemas/registerSchema";
import { forgetPasswordForm } from "../schemas/forgetPasswordSchema";
import { User } from "../../../types/user";
import { resetPasswordForm } from "../schemas/resetPasswordSchema";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IAuthContext {
    isLoading: boolean;
    authToken?: string | null;
    currentUser?: User | null;
    handleRegister: UseMutateFunction<unknown, unknown, registerForm, unknown>;
    handleLogin: UseMutateFunction<unknown, unknown, loginForm, unknown>;
    handleForgetPassword: UseMutateFunction<
        unknown,
        unknown,
        forgetPasswordForm,
        unknown
    >;
    handleResetPassword: UseMutateFunction<
        unknown,
        unknown,
        { formData: resetPasswordForm; token: string },
        unknown
    >;
    handleLogout: UseMutateFunction;
}
