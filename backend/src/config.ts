import dotenv from "dotenv";
dotenv.config();

export const config = {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
  port: process.env.PORT || 3000,
  allowedCors:
    process.env.ALLOWED_CORS?.split(",").map((url) => url.trim()) || [],
} as const;
