import type { Response } from "express";

interface SuccessOptions<T> {
    statusCode?: number;
    message: string;
    data: T;
}

export function sendSuccess<T>(
    res: Response,
    options: SuccessOptions<T>,
): Response {
    const {
        statusCode = 200,
        message,
        data,
    } = options;

    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}