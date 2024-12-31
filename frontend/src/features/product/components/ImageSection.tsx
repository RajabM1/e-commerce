import Box from "@mui/material/Box";

const ImageSection = ({
    imageUrl,
    name,
}: {
    imageUrl: string;
    name: string;
}) => {
    return (
        <Box className="image-container">
            <img
                src={imageUrl}
                alt={`${name} image`}
                className="image-section"
            />
        </Box>
    );
};

export default ImageSection;
