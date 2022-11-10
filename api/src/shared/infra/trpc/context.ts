import { IUserRepositories } from '@models/IUserRepositories'
import { IJWTProvider } from '@shared/providers/JWTProvider/IJWTProvider'
import { inferAsyncReturnType } from '@trpc/server'
import { container } from 'tsyringe'
// import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export async function createContext ({ req, res }: CreateFastifyContextOptions) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return { req, res, user: null }
  }

  const headerParts = authHeader.split(' ')

  if (headerParts.length !== 2) {
    return { req, res, user: null }
  }

  const [bearer, token] = headerParts

  if (!/^Bearer$/i.test(bearer)) {
    return { req, res, user: null }
  }

  const jwtProvider = container.resolve<IJWTProvider>('JWTProvider')
  const userRepository = container.resolve<IUserRepositories>('UserRepository')
  const { id } = await jwtProvider.decodeToken(token)

  const user = await userRepository.findById(id)

  return { req, res, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
