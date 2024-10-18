import React from "react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import { FaFacebookSquare, FaApple, FaGoogle } from "react-icons/fa"

const Login: React.FC = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = React.useState<string>("")
  const [loading, setloading] = React.useState<boolean>(false)

  if (user) {
    navigate("/")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setloading(true)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = {
      name: formData.get("username"),
      password: formData.get("password"),
    }

    const response = await login(formValues.name, formValues.password)
    if (response.error) {
      setError(response.error.message)
    } else {
      console.log("Login successful!")
    }
    setloading(false)
  }
  return (
    <div className="container">
      {/* // form should be component */}
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Your user name</label>
        <input type="text" name="username" placeholder="Leonel" required />

        <label htmlFor="password">Your password</label>
        <input type="password" name="password" placeholder="Messi" required />
        <button type="submit" disabled={loading}>
          Log In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <section>
          <button className="link">Trouble loggin in?</button>
          <p>Or log in with</p>
          <article>
            <button className="box">
              <FaGoogle className="icon" />
            </button>
            <button className="box">
              <FaFacebookSquare className="icon" />
            </button>
            <button className="box">
              <FaApple className="icon" />
            </button>
          </article>
        </section>
      </form>
    </div>
  )
}

export default Login
