import './Dashboard.css'

function Dashboard() {
  return (
    <div>
      <div className="dash-header">
        <h1 className="dash-title">Today's overview</h1>
        <p className="dash-sub">A quick snapshot of what's happening right now.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">OPD registrations today</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Appointments today</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Inpatients admitted</div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="quick-actions">
        <button className="action-btn">Register new patient</button>
        <button className="action-btn secondary">Book appointment</button>
      </div>
    </div>
  )
}

export default Dashboard