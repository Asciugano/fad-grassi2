import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Redis error: ", err));

await client.connect();

export default client;

export async function getOrSetCache<T>(key: string, cb: () => Promise<T>, expiration?: number): Promise<T | null> {
  try {
    const cachedData = await client.get(key);
    if (cachedData)
      return JSON.parse(cachedData) as T;

    const data = await cb();
    client.setEx(key, expiration || 15 * 60, JSON.stringify(data));

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
