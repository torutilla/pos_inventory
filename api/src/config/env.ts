import "dotenv/config";

const requiredEnvVariables = [
    "DATABASE_URL",
    "PORT",
] as const;

for (const variableName of requiredEnvVariables) {
    if (!process.env[variableName]) {
        throw new Error(
            `Missing required environment variable: ${variableName}`,
        );
    }
}

const env = {
    port: Number(process.env.PORT),
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV ?? "development",
};

export default env;