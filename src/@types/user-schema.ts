import { z } from 'zod';

export const zodSchemaUserRegister = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(16, 'Mínimo 16 caracteres'),
  lastName: z.string().min(3, 'Mínimo 3 caracteres').max(16, 'Máximo 16 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres'),
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
});

export type UserRegister = z.infer<typeof zodSchemaUserRegister>;

export const zodSchemaUserLogin = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres'),
});

export type UserLogin = z.infer<typeof zodSchemaUserLogin>;
