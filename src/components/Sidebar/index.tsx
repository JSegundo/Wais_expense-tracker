import { useAuth } from "../../context/useAuth"
import { NavLink, useLocation } from "react-router-dom"
import { IoIosCloseCircleOutline } from "react-icons/io"
import styles from "./Sidebar.module.scss"

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const { user, logout } = useAuth()

  const location = useLocation()
  const { pathname } = location

  const isRouteActive = (route: string) => {
    return route === pathname
  }

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
      <div className={styles.sidebarHeader}>
        <h1 className="title">Wais</h1>
        <button className={`link ${styles.closeIcoṇ}`} onClick={toggleSidebar}>
          <IoIosCloseCircleOutline size={30} />
        </button>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/" className={isRouteActive("/") ? styles.active : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all"
              className={isRouteActive("/all") ? styles.active : ""}
            >
              All transactions
            </NavLink>
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
  )
}

export default Sidebar
