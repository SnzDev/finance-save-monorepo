import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@api/src/shared/infra/trpc/router'

export const trpc = createTRPCReact<AppRouter>()
