export type ApiError = {
    response: { data: { message: string } };
};

export type ApiValidationError = {
    status?: number;
};
