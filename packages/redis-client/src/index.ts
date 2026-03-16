import 'dotenv/config';
import Redis from 'ioredis';
import pino from 'pino';

let redis: Redis;
const logger = pino({
  level: 'info',
});
export function getRedis() {
  const REDIS_HOST = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;

  if (REDIS_HOST == undefined || REDIS_PORT == undefined) {
    const err = 'Redis Environment variables is not set';
    logger.error(err);
    throw new Error(err);
  }

  if (!redis) {
    redis = new Redis({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      maxRetriesPerRequest: null,
    });

    redis.on('connect', () => {
      logger.info('Redis connected');
    });

    redis.on('error', (err) => {
      logger.error(`Redis error: ${err}`);
    });
  }

  return redis;
}
