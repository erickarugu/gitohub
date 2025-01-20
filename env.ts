import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  GITHUB_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export { env };
export default env;
