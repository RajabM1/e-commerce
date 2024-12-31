import { Box, Container } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import TextWithLink from "../../../components/shared/navigation/TextWithLink";
import { useTranslation } from "react-i18next";
import { paths } from "../../../config/paths";
import Message from "../../../components/shared/feedback/Message";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import PasswordInput from "../../../components/shared/form/PasswordInput";
import "../styles/AuthPage.scss";

const ResetPasswordPage = () => {
    const { t } = useTranslation("reset-password-page");
    const {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        pageMessage,
    } = useResetPasswordForm();

    return (
        <Container className="page-container" maxWidth="sm">
            {pageMessage && (
                <Message
                    message={pageMessage.message}
                    type={pageMessage.type}
                />
            )}
            <AuthHeader
                page={t("labels.page")}
                message={t("messages.welcome")}
            />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box className="form-input">
                    <PasswordInput
                        id="password"
                        label={t("labels.password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        register={register("password")}
                    />
                </Box>
                <Box className="form-input">
                    <PasswordInput
                        id="confirmPassword"
                        label={t("labels.confirm_password")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        register={register("confirmPassword")}
                    />
                </Box>

                <SubmitButton
                    label={t("labels.btn")}
                    color="black"
                    isSubmitting={isSubmitting}
                />

                <Box className="link">
                    <TextWithLink
                        text=""
                        linkText={t("labels.back")}
                        to={paths.AUTH.LOGIN}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPasswordPage;
