import "../styles/css/style.css"
import { Outlet, Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        {/* <h1>wise</h1> */}
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/settings`}>Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="detail">
        <Outlet />
      </div>
    </>
  )
}
