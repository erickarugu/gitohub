import { IORedisProvider } from "./ioredis.provider";
import Redis from "ioredis";

jest.mock("ioredis");

describe("IORedisProvider", () => {
  let provider: IORedisProvider;
  let mockRedis: jest.Mocked<Redis>;

  beforeEach(() => {
    mockRedis = new Redis() as jest.Mocked<Redis>;
    (Redis as jest.MockedClass<typeof Redis>).mockImplementation(
      () => mockRedis
    );

    provider = new IORedisProvider({
      host: "localhost",
      port: 6379,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("cacheApiResponse", () => {
    it("should store data in Redis with TTL", async () => {
      const key = "test-key";
      const data = { test: "data" };
      const ttl = 300;

      mockRedis.set.mockResolvedValue("OK");

      await provider.cacheApiResponse(key, data, ttl);

      expect(mockRedis.set).toHaveBeenCalledWith(
        key,
        JSON.stringify(data),
        "EX",
        ttl
      );
    });
  });

  describe("getCachedApiResponse", () => {
    it("should return parsed data when cache exists", async () => {
      const key = "test-key";
      const cachedData = { test: "cached-data" };

      mockRedis.get.mockResolvedValue(JSON.stringify(cachedData));

      const result = await provider.getCachedApiResponse(key);

      expect(mockRedis.get).toHaveBeenCalledWith(key);
      expect(result).toEqual(cachedData);
    });

    it("should return null when cache does not exist", async () => {
      const key = "non-existent-key";

      mockRedis.get.mockResolvedValue(null);

      const result = await provider.getCachedApiResponse(key);

      expect(mockRedis.get).toHaveBeenCalledWith(key);
      expect(result).toBeNull();
    });
  });

  describe("flushCache", () => {
    it("should call flushall on Redis client", async () => {
      mockRedis.flushall.mockResolvedValue("OK");

      await provider.flushCache();

      expect(mockRedis.flushall).toHaveBeenCalled();
    });
  });
});
