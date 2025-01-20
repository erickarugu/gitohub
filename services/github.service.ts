import env from "../env";
import { GetGitHubUsersOptions, GithubProvider } from "../providers";

export class GitHubService {
  private readonly githubProvider: GithubProvider;

  constructor() {
    this.githubProvider = new GithubProvider({
      GitHubToken: env.GITHUB_TOKEN,
    });
  }

  async getGitHubUsers(options: GetGitHubUsersOptions) {
    return this.githubProvider.getGitHubUsers(options);
  }
}
