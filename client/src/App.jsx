import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AuthPage from './features/auth/AuthPage'
import AdminLayout from './pages/admin/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import JobPostsPage from './pages/admin/JobPostsPage'
import JobPostFormPage from './pages/admin/JobPostFormPage'
import ApplicationsPage from './pages/admin/ApplicationsPage'
import ApplicationDetailPage from './pages/admin/ApplicationDetailPage'
import ApplicantsPage from './pages/admin/ApplicantsPage'
import ApplicantDetailPage from './pages/admin/ApplicantDetailPage'

function AdminGuard({ user, isCheckingSession }) {
  if (isCheckingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Verifying authorization...</p>
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/" replace />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hireflow_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      localStorage.removeItem('hireflow_user')
      return null
    }
  })
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('hireflow_token')
    if (!token) {
      setIsCheckingSession(false)
      return
    }

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Session expired')
        const data = await response.json()
        localStorage.setItem('hireflow_user', JSON.stringify(data.user))
        setUser(data.user)
      })
      .catch(() => {
        localStorage.removeItem('hireflow_token')
        localStorage.removeItem('hireflow_user')
        setUser(null)
      })
      .finally(() => setIsCheckingSession(false))
  }, [])

  const signOut = () => {
    localStorage.removeItem('hireflow_token')
    localStorage.removeItem('hireflow_user')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthPage
              user={user}
              setUser={setUser}
              signOut={signOut}
              isCheckingSession={isCheckingSession}
            />
          }
        />

        {/* Protected Admin Module Routes */}
        <Route element={<AdminGuard user={user} isCheckingSession={isCheckingSession} />}>
          <Route element={<AdminLayout user={user} signOut={signOut} />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/jobs" element={<JobPostsPage />} />
            <Route path="/admin/jobs/new" element={<JobPostFormPage />} />
            <Route path="/admin/jobs/edit/:id" element={<JobPostFormPage />} />
            <Route path="/admin/applications" element={<ApplicationsPage />} />
            <Route path="/admin/applications/:id" element={<ApplicationDetailPage />} />
            <Route path="/admin/applicants" element={<ApplicantsPage />} />
            <Route path="/admin/applicants/:id" element={<ApplicantDetailPage />} />
          </Route>
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
