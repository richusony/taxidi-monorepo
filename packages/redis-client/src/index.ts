import 'dotenv/config';
import Redis from 'ioredis';

let redis: Redis;

export function getRedis() {
  const REDIS_HOST = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;

  if (REDIS_HOST == undefined || REDIS_PORT == undefined)
    throw new Error('Redis Environment variables is not set');

  if (!redis) {
    redis = new Redis({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      maxRetriesPerRequest: null,
    });

    redis.on('connect', () => {
      console.log('Redis connected');
    });

    redis.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  return redis;
}
