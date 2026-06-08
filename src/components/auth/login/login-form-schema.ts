import * as z from 'zod'
import { emailSchema, passwordSchema } from '../auth-schema'

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type FormLogin = z.infer<typeof loginFormSchema>
