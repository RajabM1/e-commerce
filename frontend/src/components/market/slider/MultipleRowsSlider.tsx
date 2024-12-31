import { Box, ButtonBase, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Category } from "../../../features/categories/schemas/categorySchema";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";

interface Props {
    data: Category[];
}

function MultipleRowsSlider({ data }: Props) {
    const settings = {
        dots: true,
        className: "center",
        centerMode: true,
        infinite: true,
        speed: 1000,
        rows: 2,
        autoplay: true,
        slidesPerRow: 4,
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesPerRow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesPerRow: 2,
                },
            },
        ],
    };
    const navigate = useNavigate();
    return (
        <div
            className="slider-container"
            style={{ backgroundColor: "#F5F5F5" }}
        >
            <Slider {...settings}>
                {data?.map((item) => (
                    <Box
                        key={item.name}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginY: 3,
                        }}
                    >
                        <ButtonBase
                            onClick={() => {
                                navigate(paths.MARKET.BY_CATEGORY(item.name));
                            }}
                        >
                            <Box sx={{ width: "100px", height: "150px" }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width={"100px"}
                                    style={{ borderRadius: "50%" }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{ mt: 1, fontSize: "small" }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>
                        </ButtonBase>
                    </Box>
                ))}
            </Slider>
        </div>
    );
}

export default MultipleRowsSlider;
