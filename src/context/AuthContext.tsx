import React, { createContext, useState, ReactNode } from "react"
import { useLocalStorage } from "usehooks-ts"

interface User {
  username: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) => Promise<{ success?: boolean; error?: { message: string } }>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useLocalStorage<User | null>("user", null)

  const login = (
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ): Promise<{ success?: boolean; error?: { message: string } }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === "Jhon" && password === "password") {
          setUser({ username })
          setIsAuthenticated(true)
          resolve({ success: true })
        } else {
          resolve({ error: { message: "Wrong credentials, try again" } })
        }
      }, 1000) // Simulate network delay
    })
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
