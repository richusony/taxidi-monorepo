import { getCache, setCache } from './index';

export async function cacheWrapper<T>(
  key: string,
  ttl: number,
  fn: () => Promise<T>,
): Promise<T | Error> {
  const cached = await getCache<T>(key);

  if (cached) {
    return cached;
  }

  const result = await fn();
  if (!result)
    return new Error(`Error while calling ${fn.name} function in cacheWrapper`);

  await setCache(key, result, ttl);

  return result;
}
