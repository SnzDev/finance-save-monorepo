import 'reflect-metadata'
import { beforeEach, describe, expect, it } from 'vitest'
import { type inferProcedureInput } from '@trpc/server'
import { createContext } from '@shared/infra/trpc/context'
import { appRouter, type AppRouter } from '@shared/infra/trpc/router'
import { faker } from '@faker-js/faker'
import '@shared/providers/container'
import '@repositories/container'

describe('CreateUserController', () => {
  let mockUser: inferProcedureInput<AppRouter['users']['create']>
  beforeEach(() => {
    mockUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })

  it('should be able to create a new user', async () => {
    const caller = appRouter.createCaller(await createContext())

    const response = await caller.users.create(mockUser)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('created_at')
    expect(response).toHaveProperty('updated_at')
    expect(response).toHaveProperty('name', mockUser.name)
    expect(response).toHaveProperty('email', mockUser.email)
    expect(response).toHaveProperty('password')
  })

  it('should not be able to create a new user with an existing email', async () => {
    const caller = appRouter.createCaller(await createContext())

    await caller.users.create(mockUser)

    expect(await caller.users.create(mockUser).catch(response => response.code)).toBe('CONFLICT')
    expect(await caller.users.create(mockUser).catch(response => response.message)).toBe('User already exists')
  })
})
