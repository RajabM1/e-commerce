import Message from "../../../components/shared/feedback/Message";
import TextWithLink from "../../../components/shared/navigation/TextWithLink";
import { useLoginForm } from "../hooks/useLoginForm";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import SocialAuthButtons from "../components/SocialAuthButtons";
import { paths } from "../../../config/paths";
import AuthHeader from "../components/AuthHeader";
import SubmitButton from "../../../components/shared/buttons/SubmitButton";
import FormInput from "../../../components/shared/form/FormInput";
import PasswordInput from "../../../components/shared/form/PasswordInput";
import "../styles/AuthPage.scss";

const LoginPage = () => {
    const { t } = useTranslation("login-page");
    const {
        register,
        errors,
        isSubmitting,
        handleSubmit,
        onSubmit,
        pageMessage,
    } = useLoginForm();

    return (
        <Container className="page-container" maxWidth="sm">
            {pageMessage && (
                <Message
                    message={pageMessage.message}
                    type={pageMessage.type}
                />
            )}

            <AuthHeader
                page={t("labels.sign_in")}
                message={t("messages.welcome")}
            />

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box className="form-input">
                    <FormInput
                        type="text"
                        id="username"
                        label={t("labels.username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        register={register("username")}
                    />
                </Box>
                <Box>
                    <PasswordInput
                        id="password"
                        label={t("labels.password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        register={register("password")}
                    />
                </Box>

                <Box className="remember-forgot">
                    <FormControlLabel
                        control={<Checkbox />}
                        label={t("labels.remember_me")}
                    />
                    <Link href={paths.AUTH.FORGET_PASSWORD} variant="body2">
                        {t("labels.forget_password")}
                    </Link>
                </Box>

                <SubmitButton
                    label={t("labels.sign_in")}
                    color="black"
                    isSubmitting={isSubmitting}
                />

                <Divider className="divider">OR</Divider>
                <SocialAuthButtons />
                <Box className="link">
                    <TextWithLink
                        text={t("labels.do_not_have_account")}
                        linkText={t("labels.sign_up")}
                        to={paths.AUTH.REGISTER}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
