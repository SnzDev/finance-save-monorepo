import Jwt from 'jsonwebtoken'
import { IJWTProvider, ITokenPayload } from './IJWTProvider'

export class JWTProvider implements IJWTProvider {
  async generateToken (payload: ITokenPayload): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
        reject(new Error('Secret key not found'))
      }
      Jwt.sign(payload, process.env.JWT_SECRET ?? '', { expiresIn: '7d' }, (err, token) => {
        if (err)reject(err)
        if (token) resolve(token)
      })
    })
  }

  async decodeToken (token: string): Promise<ITokenPayload> {
    return await new Promise<ITokenPayload>((resolve, reject) => {
      if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
        reject(new Error('Secret key not found'))
      }
      Jwt.verify(token, process.env.JWT_SECRET ?? '', (err, decoded) => {
        if (err) reject(err)
        if (decoded) resolve(decoded as ITokenPayload)
      })
    })
  }
}
