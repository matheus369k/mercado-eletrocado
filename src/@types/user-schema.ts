import { z } from 'zod';

export const zodSchemaUserRegister = z.object({
  full_name: z.string().min(3, 'Mínimo 3 caracteres').max(56, 'Mínimo 16 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  auto_connection: z.boolean().optional().default(false),
  agree_terms: z.boolean(),
});

export type UserRegisterType = z.infer<typeof zodSchemaUserRegister>;

export const zodSchemaUserLogin = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres'),
  auto_connection: z.boolean(),
});

export type UserLoginType = z.infer<typeof zodSchemaUserLogin>;
