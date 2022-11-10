import { t } from './trpcInstance'
import { usersRoute } from '@modules/users/routes'

export const appRouter = t.router({
  users: usersRoute
})

export type AppRouter = typeof appRouter
