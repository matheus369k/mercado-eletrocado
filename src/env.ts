import { z } from 'zod';

const envSchema = z.object({
  VITE_DATABASE_URL: z.string().url(),
  VITE_GITHUB_DATABASE_URL: z
    .string()
    .url()
    .optional()
    .default(
      'https://raw.githubusercontent.com/matheus369k/mercado-eletrocado/refs/heads/main/db.json',
    ),
});

export const env = envSchema.parse(import.meta.env);
