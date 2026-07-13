import { Link } from 'react-router-dom'
import { useFrappeGetDocList } from 'frappe-react-sdk'
import './Patients.css'

interface Patient {
  name: string
  patient_name: string
  sex: string
  mobile: string
  dob: string
}

function Patients() {
  const { data, error, isLoading } = useFrappeGetDocList<Patient>('Patient', {
    fields: ['name', 'patient_name', 'sex', 'mobile', 'dob'],
    orderBy: { field: 'creation', order: 'desc' },
    limit: 50,
  })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-sub">All registered patients across the hospital.</p>
        </div>
        <Link to="/patients/new" className="primary-btn">Register new patient</Link>
      </div>

      {isLoading && <p>Loading patients...</p>}
      {error && <p>Error loading patients: {error.message}</p>}

      {data && data.length === 0 && (
        <div className="empty-state">No patients registered yet. Add your first patient to get started.</div>
      )}

      {data && data.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Mobile</th>
              <th>Date of birth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.patient_name}</td>
                <td>
                  {p.sex && (
                    <span className={`badge ${p.sex.toLowerCase() === 'male' ? 'male' : 'female'}`}>
                      {p.sex}
                    </span>
                  )}
                </td>
                <td>{p.mobile || '—'}</td>
                <td>{p.dob || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Patients