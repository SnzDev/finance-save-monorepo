import 'reflect-metadata'
import { UserRepository } from '@repositories/in-memory/UserRepository'
import { BCryptPasswordHashProvider } from '@shared/providers/PasswordHashProvider/BCryptPasswordHashProvider'
import { beforeAll, describe, it, expect, beforeEach } from 'vitest'
import { CreateUserService } from './CreateUserService'
import { faker } from '@faker-js/faker'
import { inferProcedureInput } from '@trpc/server'
import { AppRouter } from '@shared/infra/trpc/router'

describe('CreateUserService', () => {
  let createUserService: CreateUserService
  let mockUser: inferProcedureInput<AppRouter['users']['create']>

  beforeAll(() => {
    createUserService = new CreateUserService(
      new UserRepository(),
      new BCryptPasswordHashProvider())
  })
  beforeEach(() => {
    mockUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute(mockUser)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('created_at')
    expect(user).toHaveProperty('updated_at')
    expect(user).toHaveProperty('name', mockUser.name)
    expect(user).toHaveProperty('email', mockUser.email)
    expect(user).toHaveProperty('password')
  })

  it('should not be able to create a new user with an existing email', async () => {
    await createUserService.execute(mockUser)
    expect(await createUserService.execute(mockUser).catch(response => response.code)).toBe('CONFLICT')
    expect(await createUserService.execute(mockUser).catch(response => response.message)).toBe('User already exists')
  })
})
