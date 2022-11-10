import { IUserRepositories } from '@models/IUserRepositories'
import { container } from 'tsyringe'
import { UserRepository } from './prisma/UserRepository'

container.registerSingleton<IUserRepositories>('UserRepository', UserRepository)
