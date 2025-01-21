export type GetGitHubUsersOptions = {
  limit: number;
};

export type GetUsersResponse = {
  status: number;
  message: string;
  data: User[];
};

export interface User {
  username: string;
  identifier: number;
  profile_image: string;
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
  ): Promise<GetUsersResponse> {
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
      data: res.ok ? this.transformResponse(await res.json()) : [],
    };
  }

  transformResponse(response: any): User[] {
    return response.map((user: any) => ({
      username: user.login,
      identifier: user.id,
      profile_image: user.avatar_url,
    }));
  }
}
