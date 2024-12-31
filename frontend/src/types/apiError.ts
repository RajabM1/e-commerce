export class ApiError extends Error {
    response: { data: { message: string } };

    constructor(message: string) {
        super(message);
        this.response = { data: { message } };
    }
}

export type ApiValidationError = {
    status?: number;
};
