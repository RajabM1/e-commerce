import { Avatar, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

const SocialAuthButtons = () => {
    return (
        <Box className="social-container">
            <Avatar variant="rounded" className="social-icon">
                <GoogleIcon />
            </Avatar>
            <Avatar variant="rounded" className="social-icon">
                <AppleIcon />
            </Avatar>
            <Avatar variant="rounded" className="social-icon">
                <FacebookIcon />
            </Avatar>
        </Box>
    );
};

export default SocialAuthButtons;
