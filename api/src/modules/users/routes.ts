import { t } from '@shared/infra/trpc/trpcInstance'
import { CreateUserController } from './use-cases/createUser/CreateUserController'
import { createUserSchema } from './use-cases/createUser/CreateUserSchema'
import { SignInController } from './use-cases/signIn/SignInController'
import { SignInSchema } from './use-cases/signIn/SignInSchema'

const createUser = new CreateUserController()
const signIn = new SignInController()

export const usersRoute = t.router({
  create: t.procedure.input(createUserSchema).mutation(createUser.handle),
  signin: t.procedure.input(SignInSchema).mutation(signIn.handle)
})
