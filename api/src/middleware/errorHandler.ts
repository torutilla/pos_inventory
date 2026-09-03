import type {
    Request,
    Response,
    NextFunction,
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
            error.message || "Internal server error",
    });
}

export default errorHandler;