import { GithubProvider, GetGitHubUsersOptions } from "./github.provider";

describe("GithubProvider", () => {
  let provider: GithubProvider;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Store the original fetch
    const originalFetch = global.fetch;

    // Mock fetch
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    provider = new GithubProvider({
      GitHubToken: "test-token",
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getGitHubUsers", () => {
    const options: GetGitHubUsersOptions = {
      limit: 2,
    };

    it("should make correct API call with authorization header", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      });

      await provider.getGitHubUsers(options);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.github.com/users?per_page=2",
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        }
      );
    });

    it("should return success response with data", async () => {
      const mockUsers = [
        {
          id: 1,
          login: "test",
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUsers),
      });

      const result = await provider.getGitHubUsers(options);

      expect(result).toEqual({
        status: 200,
        message: "Success",
        data: [
          {
            id: 1,
            login: "test",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          },
          {
            id: 2,
            login: "test2",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
          },
        ],
      });
    });

    it("should handle unauthorized error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const result = await provider.getGitHubUsers(options);

      expect(result).toEqual({
        status: 401,
        message: "Unauthorized",
        data: [
          {
            id: 1,
            login: "test",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          },
          {
            id: 2,
            login: "test2",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
          },
        ],
      });
    });

    it("should handle rate limit error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
      });

      const result = await provider.getGitHubUsers(options);

      expect(result).toEqual({
        status: 409,
        message: "Rate Limit Exceeded",
        data: [
          {
            id: 1,
            login: "test",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          },
          {
            id: 2,
            login: "test2",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
          },
        ],
      });
    });

    it("should handle unknown error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const result = await provider.getGitHubUsers(options);

      expect(result).toEqual({
        status: 500,
        message: "Internal Server Error",
        data: [
          {
            id: 1,
            login: "test",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          },
          {
            id: 2,
            login: "test2",
            avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
          },
        ],
      });
    });
  });
});
