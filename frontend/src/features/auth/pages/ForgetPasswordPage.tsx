import { Box, Container } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../../../components/shared/form/FormInput";
import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import TextWithLink from "../../../components/shared/navigation/TextWithLink";
import { useTranslation } from "react-i18next";
import { paths } from "../../../config/paths";
import { useForgetPasswordForm } from "../hooks/useForgetPasswordForm";
import Message from "../../../components/shared/feedback/Message";
import "../styles/AuthPage.scss";

const ForgetPasswordPage = () => {
    const { t } = useTranslation("forget-password-page");
    const {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        pageMessage,
    } = useForgetPasswordForm();

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
                    <FormInput
                        type="text"
                        id="email"
                        label={t("labels.email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        register={register("email")}
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

export default ForgetPasswordPage;
