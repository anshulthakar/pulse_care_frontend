import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useFrappeAuth()

  if (isLoading) {
    return <div>Authenticating with Frappe...</div>
  }

  if (!currentUser || currentUser === 'Guest') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute