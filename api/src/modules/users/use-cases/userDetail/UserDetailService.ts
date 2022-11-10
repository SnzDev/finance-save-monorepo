import { User } from '@prisma/client'

class UserDetailService {
  execute (user: User) {
    return user
  }
}

export { UserDetailService }
