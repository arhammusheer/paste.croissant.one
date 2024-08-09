import { createClient } from "redis";
import { config } from "./config";
import { RedisClientType } from "@redis/client";

let client: RedisClientType | null = null;

export const connectRedis = async () => {
  try {
    if (client) {
      return client;
    }

    client = createClient({
      url: config.redis.url,
    });

    client.on("error", (err) => {
      console.error(err);
    });

    await client.connect();

    console.log("Connected to Redis");

    return client as RedisClientType;
  } catch (err) {
    console.error(err);
    return null;
  }
};
