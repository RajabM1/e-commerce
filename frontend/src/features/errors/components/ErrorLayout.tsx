import { Box, Typography } from "@mui/material";
import ActionButton from "../../../components/shared/buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import "../styles/ErrorLayout.scss";

interface Props {
    title: string;
    description: string;
    buttonLabel: string;
}

const ErrorLayout = ({ title, description, buttonLabel }: Props) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Box className="error-container">
            <Typography variant="h3" component="h1" className="error-title">
                {title}
            </Typography>
            <Typography
                variant="h6"
                component="p"
                className="error-description"
            >
                {description}
            </Typography>
            <ActionButton
                label={buttonLabel}
                className={"error-button"}
                onClick={goBack}
            />
        </Box>
    );
};

export default ErrorLayout;
