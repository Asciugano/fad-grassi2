import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.error("Redis error: ", err));

await client.connect();

// istanza di redis per utilizzare la cache
export default client;

export async function getOrSetCache<T>(key: string, cb: () => Promise<T>, expiration?: number): Promise<T | null> {
  try {
    // presa dei dati dalla cache
    const cachedData = await client.get(key);
    if (cachedData)
      return JSON.parse(cachedData) as T;

    // se non ci sono dati nella cache chiamata della callback
    const data = await cb();
    // impostazione della chiave per la cache con expiration di 15 min
    client.setEx(key, expiration || 15 * 60, JSON.stringify(data));

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
