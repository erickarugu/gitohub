import Redis from "ioredis";

interface IORedisProviderOptions {
  host: string;
  port: number;
}

export class IORedisProvider {
  private readonly redis: Redis;

  constructor(options: IORedisProviderOptions) {
    // Create a Redis client instance
    this.redis = new Redis(
      options.port, // Redis server port
      options.host, // Redis server host
      {}
    );
  }

  // Cache an API response
  cacheApiResponse = async (key: string, data: any, ttl = 300) => {
    // Convert the data to a JSON string
    const json = JSON.stringify(data);

    // Store the JSON strin in Redis with an expiration of 5 minutes (300 seconds) by default
    await this.redis.set(key, json, "EX", ttl);
  };

  // Retrieve a cached API response
  getCachedApiResponse = async <T>(key: string): Promise<T | null> => {
    // Get the JSON string from Redis
    const json = await this.redis.get(key);

    if (json) {
      // Parse the JSON string back into an object
      return JSON.parse(json);
    }

    return null; // Return null if the key does not exist in the cache
  };

  // Flush all keys in the cache
  flushCache = async () => {
    console.log("Flushing cache...");
    // Delete all keys in the cache
    await this.redis.flushall();
  };
}
