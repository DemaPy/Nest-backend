import { z } from 'zod';

export const configSchema = z.object({
  ORIGIN: z.string(),

  DATABASE_URL: z.string().url().startsWith('postgresql://'),

  MAIL_FROM: z.string().includes("@").optional().default("noreply@localhost"),

  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string(),
  EMAIL_USERNAME: z.string(),
  EMAIL_PASSWORD: z.string(),

  STRIPE_API_KEY: z.string()
});

export type Config = z.infer<typeof configSchema>;