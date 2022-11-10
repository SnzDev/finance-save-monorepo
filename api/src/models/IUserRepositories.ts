import type { User } from '@prisma/client'

interface IUserRepositories {
  create: ({ name, email, password }: Omit<User, 'id' | 'created_at' | 'updated_at'>) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}

export { IUserRepositories }
