import { createBrowserRouter } from 'react-router-dom'
import { RedirectToUserPage } from '@components/RedirectToUserPage'
import { Dashboard } from '@pages/Dashboard'
import { SignIn } from '@pages/SignIn'
import { SignUp } from '@pages/SignUp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RedirectToUserPage />
  },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/dashboard', element: <Dashboard /> }
])
