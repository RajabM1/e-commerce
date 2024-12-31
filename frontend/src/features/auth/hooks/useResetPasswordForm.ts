import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    resetPasswordForm,
    resetPasswordSchema,
} from "../schemas/resetPasswordSchema";
import { PageMessageType } from "../../../types/pageMessage";
import { useAuth } from "../context";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../config/paths";

export const useResetPasswordForm = () => {
    const { token } = useParams();
    const { t } = useTranslation("reset-password-page");
    const { handleResetPassword } = useAuth();
    const [pageMessage, setPageMessage] = useState<PageMessageType | null>(
        null
    );
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<resetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit: SubmitHandler<resetPasswordForm> = async (formData) => {
        setPageMessage(null);
        try {
            await handleResetPassword({ formData, token: token ?? "" });
            navigate(paths.AUTH.LOGIN);
        } catch {
            setPageMessage({
                message: t("messages.error"),
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
