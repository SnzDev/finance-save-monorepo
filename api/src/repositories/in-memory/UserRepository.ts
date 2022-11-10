import { User } from '@prisma/client'
import crypto from 'crypto'
import { IUserRepositories } from '@models/IUserRepositories'

class UserRepository implements IUserRepositories {
  private readonly users: User[] = []
  async create ({ name, email, password }: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const user = { id: crypto.randomUUID(), name, email, password, created_at: new Date(), updated_at: new Date() }
    this.users.push(user)
    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)
    return user ?? null
  }

  async findById (id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)
    return user ?? null
  }
}

export { UserRepository }
