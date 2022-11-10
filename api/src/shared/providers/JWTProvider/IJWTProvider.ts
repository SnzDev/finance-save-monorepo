export interface ITokenPayload {
  id: string
}

export interface IJWTProvider {
  generateToken: (payload: ITokenPayload) => Promise<string>
  decodeToken: (token: string) => Promise<ITokenPayload>
}
