import { useAuth } from "../context/useAuth"
import "../styles/css/style.css"
import { Outlet, Link } from "react-router-dom"

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <>
      <div className="sidebar">
        <h1>wise</h1>
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
    </>
  )
}
