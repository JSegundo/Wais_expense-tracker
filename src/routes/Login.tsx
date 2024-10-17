import React, { useState } from "react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
  const { login, user } = useAuth()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  if (user) {
    navigate("/")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(username, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
