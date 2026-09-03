import type { UserRole } from "../../types/user.js";

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthenticatedUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface LoginResult {
    user: AuthenticatedUser;
    accessToken: string;
}