import "dotenv/config";

function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(
            `Missing required environment variable: ${name}`,
        );
    }

    return value;
}

const env = {
    port: Number(getRequiredEnv("PORT")),
    databaseUrl: getRequiredEnv("DATABASE_URL"),
    jwtSecret: getRequiredEnv("JWT_SECRET"),
    nodeEnv: process.env.NODE_ENV ?? "development",
};

export default env;