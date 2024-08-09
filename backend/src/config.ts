export const config = {
  redis: {
    host: process.env.REDIS_HOST || "localhost",
  },
	port: process.env.PORT || 3000,
} as const;
