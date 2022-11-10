import { inferAsyncReturnType } from '@trpc/server'
// import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export async function createContext () {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>
