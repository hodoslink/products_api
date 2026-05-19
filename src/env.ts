import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  UPLOAD_DIR: z.string().default("./public/uploads"),
});

const envParsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
});

if (!envParsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(envParsed.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envParsed.data;
