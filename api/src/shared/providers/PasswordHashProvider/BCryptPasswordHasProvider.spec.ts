import { faker } from '@faker-js/faker/'
import { describe, expect, it } from 'vitest'
import { BCryptPasswordHashProvider } from './BCryptPasswordHashProvider'

describe('BCryptPasswordHashProvider', () => {
  it('should be able to generate a hash', async () => {
    const payload = faker.internet.password()
    const PasswordHashProvider = new BCryptPasswordHashProvider()
    const hashedPassword = await PasswordHashProvider.generateHash(payload)
    expect(hashedPassword).not.toBe(payload)
  })

  it('should be able to compare a hash', async () => {
    const payload = faker.internet.password()
    const PasswordHashProvider = new BCryptPasswordHashProvider()
    const hashedPassword = await PasswordHashProvider.generateHash(payload)
    const isValid = await PasswordHashProvider.compareHash(payload, hashedPassword)
    expect(isValid).toBe(true)
  })
})
