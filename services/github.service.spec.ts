import { GitHubService } from "./github.service";

describe("GitHubService", () => {
  let service: GitHubService;

  beforeEach(() => {
    service = new GitHubService();
  });

  describe("getGitHubUsers", () => {
    it("should return github users", async () => {
      const result = await service.getGitHubUsers({ limit: 2 });

      expect(result.status).toBe(200);
      expect(result.message).toBe("Success");
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toHaveProperty("id");
      expect(result.data[0]).toHaveProperty("login");
      expect(result.data[0]).toHaveProperty("avatar_url");
    });
  });
});
