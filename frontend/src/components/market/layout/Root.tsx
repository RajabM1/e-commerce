import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import "../../../../styles/main.scss";

const Root = ({ children }: PropsWithChildren) => {
    return (
        <>
            <NavBar />
            <Box>{children}</Box>
            <Footer />
        </>
    );
};

export default Root;
