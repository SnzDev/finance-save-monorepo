import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'No mínimo 8 caracteres')
})

export type SignInData = z.infer<typeof SignInSchema>
