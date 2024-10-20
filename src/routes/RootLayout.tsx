import { useState } from "react"
import { useAuth } from "../context/useAuth"
import "../styles/css/style.css"
import { Outlet, Link, useLocation } from "react-router-dom"
import { IoMenu } from "react-icons/io5"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { AnimatePresence, motion } from "framer-motion"

export default function RootLayout() {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const location = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="layout-container">
      <header>
        <button onClick={toggleSidebar} className="link">
          <IoMenu size={30} />
        </button>
      </header>
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h1 className="title">Wais</h1>
          <button className="link" onClick={toggleSidebar}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
          </ul>
          {user?.username && (
            <div>
              <h4>{user.username}</h4>
              <button onClick={logout} className="destructive">
                Log Out
              </button>
            </div>
          )}
        </nav>
      </div>
      <AnimatePresence>
        <div className="detail">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  )
}
