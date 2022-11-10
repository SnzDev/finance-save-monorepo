import { User } from '@prisma/client'
import { prisma } from '@shared/infra/database/prisma'
import { IUserRepositories } from '@models/IUserRepositories'

class UserRepository implements IUserRepositories {
  async create ({ name, email, password }: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async findById (id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  }
}

export { UserRepository }
