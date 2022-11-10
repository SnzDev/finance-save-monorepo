import { IUserRepositories } from '@models/IUserRepositories'
import { TRPCError } from '@trpc/server'
import { User } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { CreateUserData } from './CreateUserSchema'
import { IPasswordHashProvider } from '@shared/providers/PasswordHashProvider/IPasswordHashProvider'

@injectable()
class CreateUserService {
  constructor (
    @inject('UserRepository')
    private readonly userRepository: IUserRepositories,

    @inject('PasswordHashProvider')
    private readonly passwordHashProvider: IPasswordHashProvider) {}

  async execute (data: CreateUserData): Promise<User> {
    const { email, name } = data
    const password = await this.passwordHashProvider.generateHash(data.password)
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User already exists'
      })
    }

    const user = await this.userRepository.create({ name, email, password })

    return user
  }
}

export { CreateUserService }
