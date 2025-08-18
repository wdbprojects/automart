import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    S3_BUCKET_ACCESS_KEY: z.string(),
    S3_BUCKET_SECRET_KEY: z.string(),
    AUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    FROM_EMAIL_ADDRESS: z.string(),
    X_AUTH_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGIX_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    S3_BUCKET_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
    S3_BUCKET_SECRET_KEY: process.env.S3_BUCKET_SECRET_KEY,
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FROM_EMAIL_ADDRESS: process.env.FROM_EMAIL_ADDRESS,
    X_AUTH_TOKEN: process.env.X_AUTH_TOKEN,
  },
});
