import { Router } from "express";
import { connectRedis } from "./redis";

const router = Router();

router.get("/:key", async (req, res) => {
  const redis = await connectRedis();

  const { key } = req.params;
  const value = redis ? await redis.get(key) : "";

  res.json({ key, value });
});

router.post("/:key", async (req, res) => {
  const redis = await connectRedis();

  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    // Unset redis
    if (redis) {
      await redis.del(key);
    }
    return res.json({ key, value: "" });
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
