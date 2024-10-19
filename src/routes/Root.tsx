import { useState } from "react"
import { useAuth } from "../context/useAuth"
import "../styles/css/style.css"
import { Outlet, Link } from "react-router-dom"
import { IoMenu } from "react-icons/io5"
import { IoIosCloseCircleOutline } from "react-icons/io"

export default function Sidebar() {
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
          <h1>Wais</h1>
          <button className="link" onClick={toggleSidebar}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/settings`}>Settings</Link>
            </li>
          </ul>
          {user?.username && (
            <div>
              <h4>{user.username}</h4>
              <button onClick={logout}>Log Out</button>
            </div>
          )}
        </nav>
      </div>

      <div className="detail">
        <Outlet />
      </div>
    </div>
  )
}
