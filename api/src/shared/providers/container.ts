import { container } from 'tsyringe'

import { IPasswordHashProvider } from './PasswordHashProvider/IPasswordHashProvider'
import { BCryptPasswordHashProvider } from './PasswordHashProvider/BCryptPasswordHashProvider'
import { IJWTProvider } from './JWTProvider/IJWTProvider'
import { JWTProvider } from './JWTProvider/JWTProvider'

container.registerSingleton<IPasswordHashProvider>('PasswordHashProvider', BCryptPasswordHashProvider)

container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider)
