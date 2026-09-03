import type {
    Request,
    Response,
    NextFunction,
} from "express";
import jwt from "jsonwebtoken";

import pool from "../db/database.js";
import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

import type { AuthenticatedUser } from "../modules/auth/auth.types.js";
import type { UserRow } from "../types/user.js";



async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw new AppError(
                "Authentication required",
                401,
            );
        }

        const [scheme, token] =
            authorizationHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            throw new AppError(
                "Invalid authorization header",
                401,
            );
        }

        const payload = verifyAccessToken(token);

        const result = await pool.query<UserRow>(
            `
        SELECT
          id,
          name,
          email,
          role,
          is_active
        FROM users
        WHERE id = $1
        LIMIT 1;
      `,
            [payload.userId],
        );

        const user = result.rows[0];

        if (!user || !user.is_active) {
            throw new AppError(
                "Authentication required",
                401,
            );
        }

        const authenticatedUser: AuthenticatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        req.user = authenticatedUser;

        next();
    } catch (error) {
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.TokenExpiredError
        ) {
            next(
                new AppError(
                    "Invalid or expired token",
                    401,
                ),
            );

            return;
        }

        next(error);
    }
}

export default authenticate;