import { IJWTProvider } from '@shared/providers/JWTProvider/IJWTProvider'
import { IPasswordHashProvider } from '@shared/providers/PasswordHashProvider/IPasswordHashProvider'
import { IUserRepositories } from '@models/IUserRepositories'
import { inject, injectable } from 'tsyringe'
import { TRPCError } from '@trpc/server'

@injectable()
class SignInService {
  constructor (
    @inject('UserRepository')
    private readonly usersRepository: IUserRepositories,
    @inject('PasswordHashProvider')
    private readonly passwordHashProvider: IPasswordHashProvider,
    @inject('JWTProvider')
    private readonly jwtProvider: IJWTProvider
  ) {}

  async execute ({ email, password }: { email: string, password: string }) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'E-mail ou senha incorreta' })
    }

    const passwordMatch = await this.passwordHashProvider.compareHash(password, user.password)
    if (!passwordMatch) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'E-mail ou senha incorreta' })
    }
    const token = await this.jwtProvider.generateToken({ id: user.id })
    return token
  }
}
export { SignInService }
