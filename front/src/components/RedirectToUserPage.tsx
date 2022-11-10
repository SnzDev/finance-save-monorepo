import { Navigate } from 'react-router-dom'

export function RedirectToUserPage () {
  return <Navigate to={'/signin'} />
}
