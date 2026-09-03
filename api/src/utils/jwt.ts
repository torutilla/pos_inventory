import jwt from "jsonwebtoken";

import env from "../config/env.js";

interface JwtPayload {
    userId: string;
    role: string;
}

export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.jwtSecret, {
        expiresIn: "1d",
    });
}

export function verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
}