export type GetGitHubUsersOptions = {
  limit: number;
};

export type GetGitHubUsersResponse = {
  status: number;
  message: string;
  data: User[];
};

export interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface IGithubProvider {
  getGitHubUsers(options: GetGitHubUsersOptions): Promise<any>;
}

const errorMessages: Record<number, string> = {
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Rate Limit Exceeded",
};

export class GithubProvider implements IGithubProvider {
  private readonly githubToken: string;

  constructor(options: { GitHubToken: string }) {
    this.githubToken = options.GitHubToken;
  }

  async getGitHubUsers(
    options: GetGitHubUsersOptions
  ): Promise<GetGitHubUsersResponse> {
    const { limit } = options;

    const res = await fetch(`https://api.github.com/users?per_page=${limit}`, {
      headers: {
        Authorization: `Bearer ${this.githubToken}`,
      },
    });

    const message = res.ok
      ? "Success"
      : errorMessages[res.status] ?? "Internal Server Error";

    return {
      status: res.status,
      message,
      // data: res.ok ? (await res.json()) ?? [] : [],
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
    };
  }
}
