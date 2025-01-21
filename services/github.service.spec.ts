import { GitHubService } from "./github.service";
import { IORedisService } from "./ioredis.service";

// Mock IORedisService
jest.mock("./ioredis.service");

describe("GitHubService", () => {
  let service: GitHubService;
  let mockIORedisService: jest.Mocked<IORedisService>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock implementation
    mockIORedisService = {
      getOrSetCache: jest
        .fn()
        .mockImplementation((key, callback) => callback()),
    } as any;

    // Mock the constructor
    (IORedisService as jest.Mock).mockImplementation(() => mockIORedisService);

    service = new GitHubService();
  });

  describe("getGitHubUsers", () => {
    it("should return github users", async () => {
      const result = await service.getGitHubUsers({ limit: 2 });

      // Verify cache was attempted
      expect(mockIORedisService.getOrSetCache).toHaveBeenCalledWith(
        "users",
        expect.any(Function)
      );

      expect(result.status).toBe(200);
      expect(result.message).toBe("Success");
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toHaveProperty("identifier");
      expect(result.data[0]).toHaveProperty("username");
      expect(result.data[0]).toHaveProperty("profile_image");
    });
  });
});
