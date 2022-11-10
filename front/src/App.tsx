import { trpc } from '@shared/services/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router'

export function App () {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3333/trpc'
          // optional
          // headers () {
          //   return {
          //     authorization: getAuthCookie()
          //   }
          // }
        })
      ]
    })
  )
  return <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </trpc.Provider>
}
