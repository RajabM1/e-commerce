import { ApiError } from "../types/apiError";

export const errorFormatter = (error: ApiError) => {
    try {
        const formattedMessage = error.response.data.message
            .replace(/'/g, '"')
            .replace(/([a-zA-Z0-9_]+):/g, '"$1":');

        const errorResponse = JSON.parse(formattedMessage);

        return errorResponse;
    } catch (err) {
        console.error("Error parsing the response", err);
    }
};
