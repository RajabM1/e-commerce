import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { NextArrow } from "./layout/NextArrow";
import { PrevArrow } from "./layout/PrevArrow";
import ProductCard from "../product/ProductCard";
import { Item } from "../../../features/product/schemas/itemSchema";

interface Props {
    label: string;
    data: Item[];
    bgcolor?: string;
    textColor?: string;
}

const ProductSlider = ({ label, bgcolor, textColor, data }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        nextArrow: <NextArrow hidden={isMobile} />,
        prevArrow: <PrevArrow hidden={isMobile} />,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box
            sx={{
                margin: "50px 0",
                backgroundColor: bgcolor,
                borderRadius: "10px",
                p: 1,
            }}
        >
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    marginBottom: 2,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    color: textColor,
                    fontWeight: "bold",
                }}
            >
                {label}
            </Typography>
            <Slider {...settings}>
                {data.map((item) => (
                    <Box key={item.id} sx={{ padding: "0 10px" }}>
                        <ProductCard
                            id={item.id ?? 0}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            category={item.category}
                            discount={item.discount}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ProductSlider;
