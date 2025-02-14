import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";

import swaggerDocument from "./swagger/swagger.json";
import env from "./env";
import { GitHubService } from "./services";

const app: Express = express();
const gitHubService = new GitHubService();
const PORT = env.PORT;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use(async (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}; Method: ${req.method}`);
  next();
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/users", async (req, res) => {
  const response = await gitHubService.getGitHubUsers({
    limit: 30,
  });

  res.status(response.status).json(response.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
  console.log(
    `API Documentation is running on http://localhost:${PORT}/api/docs`
  );
});
