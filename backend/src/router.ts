import { Router } from "express";
import { connectRedis } from "./redis";

const router = Router();

router.get("/:key", async (req, res) => {
  const redis = await connectRedis();

  const { key } = req.params;
  const value = redis ? await redis.get(key) : null;

  if (!value) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ key, value });
});

router.post("/:key", async (req, res) => {
  const redis = await connectRedis();

  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Value is required" });
  }

  if (redis) {
    // 24 hours
    await redis.set(key, value, {
      EX: 60 * 60 * 24,
    });
  } else {
    return res.status(500).json({ error: "Failed to connect to Redis" });
  }

  res.json({ key, value });
});

export default router;
