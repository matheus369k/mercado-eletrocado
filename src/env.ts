import { z } from 'zod';

const envSchema = z.object({
  VITE_DATABASE_URL: z.string().url(),
  VITE_GA_ID: z.string().optional(),
});

export const env = envSchema.parse(import.meta.env);
