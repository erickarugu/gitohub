import express, { Express } from "express";
import { User } from "./providers";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import env from "./env";
import { GitHubService } from "./services/github.service";
import { IORedisService } from "./services/ioredis.service";

const app: Express = express();
const gitHubService = new GitHubService();
const ioRedisService = new IORedisService();
const PORT = env.PORT;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(async (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl} Method: ${req.method}`);
  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/users", async (req, res) => {
  const users = await ioRedisService.getOrSetCache<User[]>(
    "users",
    async () => {
      let data = await gitHubService.getGitHubUsers({
        limit: 30,
      });

      return data.data;
    }
  );

  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
