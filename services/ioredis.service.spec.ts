import { IORedisService } from "./ioredis.service";

jest.mock("../providers/ioredis.provider", () => {
  return {
    IORedisProvider: jest.fn().mockImplementation(() => ({
      getCachedApiResponse: jest.fn(),
      cacheApiResponse: jest.fn(),
      flushCache: jest.fn(),
    })),
  };
});

describe("IORedisService", () => {
  let service: IORedisService;

  beforeEach(() => {
    service = new IORedisService();
  });

  describe("getOrSetCache", () => {
    it("should return cached data if available", async () => {
      const mockData = { test: "data" };
      const mockCallback = jest.fn();

      // @ts-ignore - accessing private property for test
      service.ioRedisProvider.getCachedApiResponse.mockResolvedValue(mockData);

      const result = await service.getOrSetCache("test-key", mockCallback);

      expect(result).toEqual(mockData);
      expect(mockCallback).not.toHaveBeenCalled();
    });

    it("should call callback and cache data if no cached data exists", async () => {
      const mockData = { test: "fresh-data" };
      const mockCallback = jest.fn().mockResolvedValue(mockData);

      // @ts-ignore - accessing private property for test
      service.ioRedisProvider.getCachedApiResponse.mockResolvedValue(null);

      const result = await service.getOrSetCache("test-key", mockCallback);

      expect(result).toEqual(mockData);
      expect(mockCallback).toHaveBeenCalled();
      // @ts-ignore - accessing private property for test
      expect(service.ioRedisProvider.cacheApiResponse).toHaveBeenCalledWith(
        "test-key",
        mockData
      );
    });
  });

  describe("clearCache", () => {
    it("should call flushCache on provider", async () => {
      await service.clearCache();

      // @ts-ignore - accessing private property for test
      expect(service.ioRedisProvider.flushCache).toHaveBeenCalled();
    });
  });
});
