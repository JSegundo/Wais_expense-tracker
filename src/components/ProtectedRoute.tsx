import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export interface ProtectedRouteProps {
  children: React.ReactNode
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user } = useAuth()
  console.log(JSON.stringify(user))
  // user is not authenticated
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
  //   return <Outlet />
}
