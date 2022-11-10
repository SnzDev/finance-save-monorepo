import 'reflect-metadata'
import 'dotenv/config'
import fastify from 'fastify'

import cors from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'

import '@shared/providers/container'
import '@repositories/container'

import { appRouter } from '@shared/infra/trpc/router'
import { createContext } from '@shared/infra/trpc/context'

async function startServer () {
  const app = fastify({
    maxParamLength: 5000
  })

  await app.register(cors, {
    origin: '*'
  })

  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext
    }
  })
  return await app
}

export { startServer }
