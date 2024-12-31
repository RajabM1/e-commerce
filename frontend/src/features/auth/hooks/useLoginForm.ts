import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm, loginSchema } from "../schemas/loginSchema";
import { useAuth } from "../context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageMessageType } from "../../../types/pageMessage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";

export const useLoginForm = () => {
    const { t } = useTranslation("login-page");
    const { handleLogin } = useAuth();
    const [pageMessage, setPageMessage] = useState<PageMessageType | null>(
        null
    );
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<loginForm> = async (data) => {
        setPageMessage(null);
        try {
            await handleLogin(data);
            navigate(paths.HOME, { replace: true });
        } catch {
            setPageMessage({
                message: t("messages.invalid_data"),
                type: "error",
            });
        }
    };

    return {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        pageMessage,
    };
};
