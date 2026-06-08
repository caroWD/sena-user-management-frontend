import * as z from 'zod'
import { emailSchema, passwordSchema } from '../auth-schema'

export const registerFormSchema = z
  .object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: emailSchema,
    password: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Las contraseñas no coinciden',
    path: ['confirm'],
  })

export type FormRegister = z.infer<typeof registerFormSchema>
