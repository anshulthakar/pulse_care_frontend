import { FrappeProvider, useFrappeAuth, useFrappeGetDocList } from 'frappe-react-sdk'

function LoginTest() {
  const { login, currentUser, isLoading } = useFrappeAuth()

  const handleLogin = async () => {
    try {
      await login({ username: 'Administrator', password: '123' })
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  if (isLoading) return <p>Checking session...</p>

  return currentUser ? (
    <div>
      <p>Logged in as {currentUser}</p>
      <PatientList />
    </div>
  ) : (
    <button onClick={handleLogin}>Login as Administrator</button>
  )
}

function PatientList() {
  const { data, error, isLoading } = useFrappeGetDocList('Patient', {
    fields: ['name'],
    limit: 5,
  })

  if (isLoading) return <p>Loading patients...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h3>Patients ({data?.length ?? 0})</h3>
      <ul>{data?.map((p) => <li key={p.name}>{p.name}</li>)}</ul>
    </div>
  )
}

function App() {
  return (
    <FrappeProvider url=''>
      <LoginTest />
    </FrappeProvider>
  )
}

export default App
