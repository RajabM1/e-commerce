import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    forgetPasswordForm,
    forgetPasswordSchema,
} from "../schemas/forgetPasswordSchema";
import { PageMessageType } from "../../../types/pageMessage";

export const useForgetPasswordForm = () => {
    const { t } = useTranslation("forget-password-page");
    const { handleForgetPassword } = useAuth();
    const [pageMessage, setPageMessage] = useState<PageMessageType | null>(
        null
    );
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<forgetPasswordForm>({
        resolver: zodResolver(forgetPasswordSchema),
    });

    const onSubmit: SubmitHandler<forgetPasswordForm> = async (data) => {
        setPageMessage(null);
        try {
            await handleForgetPassword(data);
            setPageMessage({ message: t("messages.success"), type: "info" });
        } catch {
            setPageMessage({ message: t("messages.fail"), type: "error" });
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
