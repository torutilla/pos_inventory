import bcrypt from "bcrypt";

import pool from "../../db/database.js";
import AppError from "../../utils/AppError.js";
import { generateAccessToken } from "../../utils/jwt.js";

import type {
    AuthenticatedUser,
    LoginInput,
    LoginResult,
} from "./auth.types.js";

import type { UserRow } from "../../types/user.js";

interface LoginUserRow extends UserRow {
    password_hash: string;
}
export async function login(
    input: LoginInput,
): Promise<LoginResult> {
    const { email, password } = input;

    const result = await pool.query<LoginUserRow>(
        `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        is_active
      FROM users
      WHERE email = $1
      LIMIT 1;
    `,
        [email],
    );

    const user = result.rows[0];


    if (!user) {
        throw new AppError(
            "Invalid email or password",
            401,
        );
    }


    if (!user.is_active) {
        throw new AppError(
            "This account is inactive",
            403,
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
    );

    if (!isPasswordValid) {
        throw new AppError(
            "Invalid email or password",
            401,
        );
    }

    const authenticatedUser: AuthenticatedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = generateAccessToken({
        userId: user.id,
        role: user.role,
    });

    return {
        user: authenticatedUser,
        accessToken,
    };
}