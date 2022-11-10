
interface IPasswordHashProvider {
  generateHash: (payload: string) => Promise<string>
  compareHash: (payload: string, hashed: string) => Promise<boolean>
}

export { IPasswordHashProvider }
