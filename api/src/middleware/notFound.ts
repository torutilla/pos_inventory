import type { Request, Response, NextFunction } from "express";

import AppError from "../utils/AppError.js";

function notFound(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`,
            404,
        ),
    );
}

export default notFound;