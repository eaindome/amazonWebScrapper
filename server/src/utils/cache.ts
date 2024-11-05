import { createClient } from "redis";

const client = createClient();

client.on("error", (error) => {
    console.error(`Redis client error: ${error}`);
});

client.connect();

export const setCache = async (key: string, value: any, ttlSeconds: number) => {
    await client.setEx(key, ttlSeconds, JSON.stringify(value));
};

export const getCache = async (key: string) => {
    try {
        const value = await client.get(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error(`Failed to get cache for key: ${key}`);
        return null;
    }
}