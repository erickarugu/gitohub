import env from "../env";
import {
  GetGitHubUsersOptions,
  GetUsersResponse,
  GithubProvider,
  User,
} from "../providers";
import { retryWithExponentialBackoff } from "../utils/retry";
import { IORedisService } from "./ioredis.service";

export class GitHubService {
  private readonly githubProvider: GithubProvider;
  private readonly ioRedisService: IORedisService;

  constructor() {
    this.githubProvider = new GithubProvider({
      GitHubToken: env.GITHUB_TOKEN,
    });
    this.ioRedisService = new IORedisService();
  }

  async getGitHubUsers(
    options: GetGitHubUsersOptions
  ): Promise<GetUsersResponse> {
    return await this.ioRedisService.getOrSetCache<GetUsersResponse>(
      "users",
      async () => {
        return await retryWithExponentialBackoff(() =>
          this.githubProvider.getGitHubUsers(options)
        );
      }
    );
  }
}
