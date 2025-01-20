import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  GITHUB_TOKEN: z.string(),
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_PORT: z.string().default("6379"),
});

const env = envSchema.parse(process.env);

export { env };
export default env;
