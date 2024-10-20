import React from "react"
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import { FaFacebookSquare, FaApple, FaGoogle } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

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
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="container"
      >
        {/* // form should be component */}
        <h1 className="title">Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Your user name</label>
          <input type="text" name="username" placeholder="Leonel" required />

          <label htmlFor="password">Your password</label>
          <input type="password" name="password" placeholder="Messi" required />
          <button type="submit" disabled={loading}>
            Log in
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
      </motion.div>
    </AnimatePresence>
  )
}

export default Login
