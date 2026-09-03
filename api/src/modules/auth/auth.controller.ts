import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { login } from "./auth.service.js";
import { sendSuccess } from "../../utils/response.js";

export async function loginController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const result = await login(req.body);

        sendSuccess(res, {
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export function getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    try {
        if (!req.user) {
            throw new Error("Authenticated user is missing");
        }

        sendSuccess(res, {
            message: "Current user retrieved successfully",
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        next(error);
    }
}