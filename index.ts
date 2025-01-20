import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";

import env from "./env";
import { GitHubService } from "./services/github.service";

const gitHubService = new GitHubService();

const app = express();
const PORT = env.PORT;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/users", async (req, res) => {
  const users = await gitHubService.getGitHubUsers({
    limit: 30,
  });

  console.log({ users });

  res.status(users.status).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
