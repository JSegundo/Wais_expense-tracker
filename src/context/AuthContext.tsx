import React, { createContext, useState, ReactNode } from "react"
import { useLocalStorage } from "usehooks-ts"

interface User {
  username: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useLocalStorage<User | null>("user", null)

  const login = (username: string, password: string) => {
    if (username === "test" && password === "password") {
      setUser({ username })
      setIsAuthenticated(true)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
