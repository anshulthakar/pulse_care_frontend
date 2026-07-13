import { Navigate } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'
import { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, isLoading } = useFrappeAuth()

  if (isLoading) return null
  if (!currentUser) return <Navigate to="/login" replace />

  return <>{children}</>
}

export default ProtectedRoute