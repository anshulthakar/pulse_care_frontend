import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FrappeProvider } from 'frappe-react-sdk'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Patients from './pages/Patients/Patients'
import PatientForm from './pages/Patients/PatientForm'
import AppLayout from './layouts/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    // Passing empty string uses relative URLs (/api/method/...) 
    // which Vite proxies locally and Nginx handles in production.
    <FrappeProvider
      url=""
      enableSocket={false}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes wrapped in AppLayout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/new" element={<PatientForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App