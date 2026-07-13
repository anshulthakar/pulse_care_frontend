import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFrappeCreateDoc } from 'frappe-react-sdk'
import './PatientForm.css'

function PatientForm() {
  const navigate = useNavigate()
  const { createDoc, loading } = useFrappeCreateDoc()

  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    sex: '',
    dob: '',
    blood_group: '',
    uid: '',
    email_id: '',
    mobile: '',
    invite_user: false,
    address_line1: '',
    city: '',
    address_line2: '',
    state: '',
    pincode: '',
    country: 'India',
  })
  const [error, setError] = useState('')

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const patient_name = [form.first_name, form.middle_name, form.last_name]
      .filter(Boolean)
      .join(' ')

    try {
      await createDoc('Patient', {
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        patient_name,
        sex: form.sex,
        dob: form.dob || undefined,
        blood_group: form.blood_group || undefined,
        uid: form.uid || undefined,
        email: form.email_id || undefined,
        mobile: form.mobile || undefined,
      })
      navigate('/patients')
    } catch (err: any) {
      setError(err?.message || 'Failed to register patient. Please check the details.')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Register new patient</h1>
          <p className="page-sub">Enter patient details to create a record.</p>
        </div>
      </div>

      <div className="form-card">
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic details */}
          <div className="form-section">
            <h3 className="section-title">Basic details</h3>
            <hr className="section-divider" />
            <div className="form-grid">
              <div className="form-field">
                <label>First name<span className="required">*</span></label>
                <input
                  required
                  value={form.first_name}
                  onChange={(e) => update('first_name', e.target.value)}
                  placeholder="e.g. Ramesh"
                />
              </div>
              <div className="form-field">
                <label>Middle name (optional)</label>
                <input
                  value={form.middle_name}
                  onChange={(e) => update('middle_name', e.target.value)}
                />
              </div>
              <div className="form-field full">
                <label>Last name</label>
                <input
                  value={form.last_name}
                  onChange={(e) => update('last_name', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Gender<span className="required">*</span></label>
                <select required value={form.sex} onChange={(e) => update('sex', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label>Date of birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => update('dob', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Blood group</label>
                <select value={form.blood_group} onChange={(e) => update('blood_group', e.target.value)}>
                  <option value="">Unknown</option>
                  <option value="A Positive">A+</option>
                  <option value="A Negative">A-</option>
                  <option value="B Positive">B+</option>
                  <option value="B Negative">B-</option>
                  <option value="O Positive">O+</option>
                  <option value="O Negative">O-</option>
                  <option value="AB Positive">AB+</option>
                  <option value="AB Negative">AB-</option>
                </select>
              </div>
              <div className="form-field">
                <label>Identification number (UID)</label>
                <input
                  value={form.uid}
                  onChange={(e) => update('uid', e.target.value)}
                  placeholder="Aadhaar / national ID"
                />
              </div>
            </div>
          </div>

          {/* Primary contact */}
          <div className="form-section">
            <h3 className="section-title">Primary contact</h3>
            <hr className="section-divider" />
            <div className="form-grid">
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  value={form.email_id}
                  onChange={(e) => update('email_id', e.target.value)}
                  placeholder="patient@email.com"
                />
              </div>
              <div className="form-field">
                <label>Mobile</label>
                <input
                  value={form.mobile}
                  onChange={(e) => update('mobile', e.target.value)}
                  placeholder="10-digit number"
                />
              </div>
              <div className="form-grid full">
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    checked={form.invite_user}
                    onChange={(e) => update('invite_user', e.target.checked)}
                  />
                  Invite as user (send portal login access)
                </label>
              </div>
            </div>
          </div>

          {/* Primary address */}
          <div className="form-section">
            <h3 className="section-title">Primary address</h3>
            <hr className="section-divider" />
            <div className="form-grid">
              <div className="form-field">
                <label>Address line 1</label>
                <input
                  value={form.address_line1}
                  onChange={(e) => update('address_line1', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>City</label>
                <input
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Address line 2</label>
                <input
                  value={form.address_line2}
                  onChange={(e) => update('address_line2', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>ZIP code</label>
                <input
                  value={form.pincode}
                  onChange={(e) => update('pincode', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Country</label>
                <input
                  value={form.country}
                  onChange={(e) => update('country', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Register patient'}
            </button>
            <button type="button" className="secondary-btn" onClick={() => navigate('/patients')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientForm