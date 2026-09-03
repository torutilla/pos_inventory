import bcrypt from "bcrypt";
import pool from "../src/db/database.js";

async function seedUsers() {
    const userEmail = "owner@stockpos.local";
    const password = "Password123!"
    console.log("Seeding users...");

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
        `
    INSERT INTO users (
        name,
        email,
        password_hash,
        role
    )
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email)
    DO NOTHING;
    `,
        [
            "System Owner",
            userEmail,
            passwordHash,
            "OWNER",
        ],
    );

    console.log("Users seeded.");
}

export default seedUsers;