import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import { createClient } from "redis";
import { connectRedis } from "./redis";
import router from "./router";

async function main() {
  const app = express();

  // setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("common"));
  app.use(helmet());
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://paste.croissant.one",
        ...config.allowedCors,
      ],
    })
  );

  // Health check
  app.all("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Redis
  app.use(router);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
