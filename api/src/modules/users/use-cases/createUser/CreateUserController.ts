import { container } from 'tsyringe'

import type { z } from 'zod'
import { createUserSchema } from './CreateUserSchema'
import { CreateUserService } from './CreateUserService'

interface CreateUserDTO {
  input: z.infer<typeof createUserSchema>
}

class CreateUserController {
  async handle ({ input }: CreateUserDTO) {
    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute(input)

    return user
  }
}
export { CreateUserController }
