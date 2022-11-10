import { startServer } from './app'

const PORT = Number(process.env.PORT ?? 3333)

async function main () {
  const app = await startServer()
  app.listen({ host: '0.0.0.0', port: PORT }, () =>
    console.log(`Server is running on ${PORT}`)
  )
}

void main()
