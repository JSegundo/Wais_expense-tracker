import { useState } from "react"
import "../../styles/style.scss"
import { Outlet, useLocation } from "react-router-dom"
import { IoMenu } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import styles from "./Layout.module.scss"
import Sidebar from "../../components/Sidebar"

export default function RootLayout() {
  // const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const location = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <button onClick={toggleSidebar} className="link">
          <IoMenu size={30} />
        </button>
      </header>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h1 className="title">Wais</h1>
          <button className="link" onClick={toggleSidebar}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to={`/`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`/all`}>All transactions</NavLink>
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
      </div> */}

      <AnimatePresence>
        <div className={styles.detail}>
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
