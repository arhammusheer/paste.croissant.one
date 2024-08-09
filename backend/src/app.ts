import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";
import { config } from "./config";

const app = express();

// setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://paste.croissant.one"],
  })
);

// Health check
app.all("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
