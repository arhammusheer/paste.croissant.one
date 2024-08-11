import { Router } from "express";
import { connectRedis } from "./redis";

const router = Router();

router.get("/", async (req, res) => {
  // Redirect to random key
  const key = generateRandomKey();
  res.redirect(`/${key}`);
});

router.get("/*", async (req, res) => {
  const redis = await connectRedis();
  const key = req.path.slice(1);
  const value = redis ? await redis.get(key) : null;
  res.json({ key, value: value || "" });
});

// Handle everything route
router.post("/*", async (req, res) => {
  const redis = await connectRedis();
  const key = req.path.slice(1);
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

const generateRandomKey = () => {
  const length = 6;
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

export default router;
