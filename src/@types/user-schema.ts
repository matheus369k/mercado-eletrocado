import { z } from 'zod';

export const zodSchemaUserRegister = z.object({
  full_name: z.string().min(3, 'Mínimo 3 caracteres').max(200, 'Máximo 200 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(100, 'Máximo 100 caracteres'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  auto_connection: z.boolean().optional().default(false),
  agree_terms: z.boolean(),
});

export type UserRegisterType = z.infer<typeof zodSchemaUserRegister>;

export const zodSchemaUserLogin = zodSchemaUserRegister.pick({
  auto_connection: true,
  email: true,
  password: true,
});

export type UserLoginType = z.infer<typeof zodSchemaUserLogin>;
