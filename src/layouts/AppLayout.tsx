import { NavLink, Outlet } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'
import './AppLayout.css'

function AppLayout() {
  const { currentUser, logout } = useFrappeAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-mark">P</div>
          <span className="sidebar-name">Pulse Care</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/patients" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            Patients
          </NavLink>
          <NavLink to="/appointments" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            Appointments
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">{currentUser}</div>
          <button className="logout-btn" onClick={() => logout()}>Log out</button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout