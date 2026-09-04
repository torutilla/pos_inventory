import type {
    NextFunction,
    Request,
    Response,
} from "express";

import AppError from "../utils/AppError.js";

function errorHandler(
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const statusCode =
        error instanceof AppError
            ? error.statusCode
            : 500;

    if (process.env.NODE_ENV !== "production") {
        console.error(error);
    }

    res.status(statusCode).json({
        success: false,
        message:
            error instanceof AppError
                ? error.message
                : "Internal server error",
        ...(error instanceof AppError &&
            error.errors
            ? { errors: error.errors }
            : {}),
    });
}

export default errorHandler;