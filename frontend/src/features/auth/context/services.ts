import endpoints from "../../../config/api";
import HttpService from "../../../service/HttpService";
import { removeTokens } from "../../../utils/jwtHelpers";
import { forgetPasswordForm } from "../schemas/forgetPasswordSchema";
import { loginForm } from "../schemas/loginSchema";
import { registerForm } from "../schemas/registerSchema";
import { resetPasswordForm } from "../schemas/resetPasswordSchema";

export const fetchCurrentUser = async (authToken: string | null) => {
    if (!authToken) return null;
    try {
        const response = await HttpService.getRequest(endpoints.AUTH.ME);
        return response.data.current_user;
    } catch {
        removeTokens();
    }
};

export const login = async (formData: loginForm) => {
    const response = await HttpService.postRequest(
        endpoints.AUTH.LOGIN,
        formData
    );
    return response.data;
};

export const register = async (formData: registerForm) => {
    const response = await HttpService.postRequest(endpoints.AUTH.REGISTER, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    });
    return response.data;
};

export const forgetPassword = async (formData: forgetPasswordForm) => {
    await HttpService.postRequest(endpoints.AUTH.FORGET_PASSWORD, {
        email: formData.email,
    });
};

export const resetPassword = async ({
    formData,
    token,
}: {
    formData: resetPasswordForm;
    token: string;
}) => {
    await HttpService.postRequest(endpoints.AUTH.RESET_PASSWORD(token), {
        password: formData.password,
    });
};

export const logout = async () => {
    await HttpService.deleteRequest(endpoints.AUTH.LOGOUT);
};
