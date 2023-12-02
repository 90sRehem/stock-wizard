import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().optional().default(4000),
  MICROSERVICE_PORT: z.coerce.number().optional().default(4001),
  JWT_PRIVATE_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
