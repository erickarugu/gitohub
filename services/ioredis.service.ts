import env from "../env";
import { IORedisProvider } from "../providers";

export class IORedisService {
  private readonly ioRedisProvider: IORedisProvider;

  constructor() {
    this.ioRedisProvider = new IORedisProvider({
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT),
    });
  }

  // Get or set a cached API response
  getOrSetCache<T>(key: string, cb: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve) => {
      const cachedData = await this.ioRedisProvider.getCachedApiResponse<T>(
        key
      );

      if (cachedData) {
        resolve(cachedData);
      } else {
        const freshData = await cb();

        await this.ioRedisProvider.cacheApiResponse(key, freshData);

        resolve(freshData);
      }
    });
  }

  // Clear the entire cache
  clearCache() {
    return this.ioRedisProvider.flushCache();
  }
}
