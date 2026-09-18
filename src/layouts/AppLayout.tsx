import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useFrappeAuth } from 'frappe-react-sdk'
import './AppLayout.css'

function AppLayout() {
  const { currentUser, logout } = useFrappeAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-mark">P</div>
          <span className="sidebar-name">Pulse Care</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/patients" 
            end
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            Patients
          </NavLink>
          <NavLink 
            to="/patients/new" 
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            New Patient
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">{currentUser || 'User'}</div>
          <button className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout