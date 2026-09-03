export type UserRole =
    | "OWNER"
    | "MANAGER"
    | "CASHIER";

export interface UserRow {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    is_active: boolean;
}