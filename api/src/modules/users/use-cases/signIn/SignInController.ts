import { container } from 'tsyringe'
import { SignInData } from './SignInSchema'
import { SignInService } from './SignInService'

interface SignInDTO {
  input: SignInData
}
class SignInController {
  async handle ({ input }: SignInDTO) {
    const signInService = container.resolve(SignInService)
    const token = await signInService.execute(input)
    return { token }
  }
}
export { SignInController }
