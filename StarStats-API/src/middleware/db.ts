import "dotenv/config";
import { createPool, PoolOptions, Pool } from "mysql2/promise";

const poolOptions: PoolOptions = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME || "star_stats",
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10)
};

export const pool: Pool = createPool(poolOptions);
