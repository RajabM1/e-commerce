import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerForm, registerSchema } from "../schemas/registerSchema";
import { useAuth } from "../context";
import { useState } from "react";
import { errorFormatter } from "../../../utils/errorFormatter";
import { useTranslation } from "react-i18next";
import { PageMessageType } from "../../../types/pageMessage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";

export const useRegisterForm = () => {
    const { t } = useTranslation("register-page");
    const { handleRegister } = useAuth();
    const [pageMessage, setPageMessage] = useState<PageMessageType | null>(
        null
    );
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<registerForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<registerForm> = async (data) => {
        setPageMessage(null);
        try {
            await handleRegister(data);
            navigate(paths.HOME, { replace: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.status == 400) {
                const validationErrors = errorFormatter(error);
                Object.keys(validationErrors).forEach((field) => {
                    setError(field as keyof registerForm, {
                        type: "server",
                        message: validationErrors[field][0],
                    });
                });
            } else {
                setPageMessage({
                    message: t("messages.register_error"),
                    type: "error",
                });
            }
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
