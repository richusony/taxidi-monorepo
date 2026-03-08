import { getRedis } from '@taxidi/redis-client';
export * from './cacheWrapper';

const redis = getRedis();

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);

  if (!data) return null;

  return JSON.parse(data);
}

export async function setCache(key: string, value: unknown, ttl?: number) {
  const data = JSON.stringify(value);

  if (ttl) {
    await redis.set(key, data, 'EX', ttl);
  } else {
    await redis.set(key, data);
  }
}

export async function deleteCache(key: string) {
  await redis.del(key);
}
