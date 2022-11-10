import bcrypt from 'bcrypt'

import { IPasswordHashProvider } from './IPasswordHashProvider'

class BCryptPasswordHashProvider implements IPasswordHashProvider {
  private readonly SALT_ROUNDS = 10
  async generateHash (payload: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(payload, this.SALT_ROUNDS)
    return hashedPassword
  }

  async compareHash (payload: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(payload, hashed)
    return isValid
  }
}

export { BCryptPasswordHashProvider }
