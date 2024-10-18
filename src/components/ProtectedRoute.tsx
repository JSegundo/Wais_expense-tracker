import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export interface ProtectedRouteProps {
  children: React.ReactNode
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth()

  // user is not authenticated
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
