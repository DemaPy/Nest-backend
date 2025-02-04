import { z } from 'zod';

export const configSchema = z.object({
  ORIGIN: z.string(),

  DATABASE_URL: z.string().url().startsWith('postgresql://'),
});
