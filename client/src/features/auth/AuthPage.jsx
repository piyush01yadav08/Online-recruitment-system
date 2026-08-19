import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialRegister = { name: '', email: '', phone: '', password: '' }
const initialLogin = { identifier: '', password: '' }

function Field({ label, type = 'text', name, value, onChange, placeholder, autoComplete }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </label>
  )
}

export default function AuthPage({ user, setUser, signOut, isCheckingSession }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('register')
  const [register, setRegister] = useState(initialRegister)
  const [login, setLogin] = useState(initialLogin)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect admin users to dashboard
  useEffect(() => {
    if (!isCheckingSession && user && user.role === 'admin') {
      navigate('/admin')
    }
  }, [user, isCheckingSession, navigate])

  const updateForm = (setter) => (event) => {
    const { name, value } = event.target
    setter((current) => ({ ...current, [name]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setIsSubmitting(true)
    try {
      const endpoint = mode === 'register' ? 'register' : 'login'
      const payload = mode === 'register' ? register : login
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to authenticate. Please try again.')

      localStorage.setItem('hireflow_token', data.token)
      localStorage.setItem('hireflow_user', JSON.stringify(data.user))
      setUser(data.user)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 sm:p-8 lg:p-12">
      <section className="mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-950/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-indigo-700 p-12 text-white lg:block">
          <div className="absolute -left-20 top-14 h-64 w-64 rounded-full bg-indigo-500/60 blur-2xl" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-violet-400/30 blur-2xl" />
          <div className="relative flex h-full flex-col">
            <a className="flex items-center gap-3 text-xl font-bold tracking-tight" href="#top">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg text-indigo-700">H</span>
              HireFlow
            </a>
            <div className="my-auto max-w-md">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-200">Build your future</p>
              <h1 className="text-5xl font-bold leading-tight">The right opportunity is waiting for you.</h1>
              <p className="mt-6 text-lg leading-8 text-indigo-100">Create your profile, discover roles that fit, and take the next step in your career.</p>
            </div>
            <p className="text-sm text-indigo-200">© 2026 HireFlow. Your career, made simpler.</p>
          </div>
        </div>

        <div id="top" className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-9 lg:hidden">
              <a className="flex items-center gap-2 text-xl font-bold text-indigo-700" href="#top">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-700 text-white">H</span> HireFlow
              </a>
            </div>
            {isCheckingSession ? (
              <p className="py-12 text-center text-slate-500">Checking your session...</p>
            ) : user ? (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">You are signed in</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Welcome, {user.name}!</h2>
                <p className="mt-3 text-slate-600">Your {user.role} account is authenticated and ready to use.</p>
                <div className="mt-6 space-y-2 rounded-xl bg-white p-4 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-800">Email:</span> {user.email}</p>
                  <p><span className="font-semibold text-slate-800">Phone:</span> {user.phone}</p>
                </div>
                <button className="mt-6 w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-100" onClick={signOut} type="button">Sign out</button>
              </div>
            ) : <>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-indigo-600">Welcome to HireFlow</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {mode === 'register' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-slate-500">
              {mode === 'register' ? 'Start your job search in just a few moments.' : 'Sign in to continue your journey.'}
            </p>

            <div className="mt-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Authentication options">
              {['register', 'login'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={mode === tab}
                  onClick={() => { setMode(tab); setNotice(''); setError('') }}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold capitalize transition ${mode === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab === 'register' ? 'New user' : 'Existing user'}
                </button>
              ))}
            </div>

            <form className="mt-7 space-y-5" onSubmit={submit}>
              {mode === 'register' ? (
                <>
                  <Field label="Full name" name="name" value={register.name} onChange={updateForm(setRegister)} placeholder="Enter your full name" autoComplete="name" />
                  <Field label="Email address" type="email" name="email" value={register.email} onChange={updateForm(setRegister)} placeholder="you@example.com" autoComplete="email" />
                  <Field label="Phone number" type="tel" name="phone" value={register.phone} onChange={updateForm(setRegister)} placeholder="Enter your phone number" autoComplete="tel" />
                  <Field label="Create password" type="password" name="password" value={register.password} onChange={updateForm(setRegister)} placeholder="At least 8 characters" autoComplete="new-password" />
                </>
              ) : (
                <>
                  <Field label="Email address or phone number" name="identifier" value={login.identifier} onChange={updateForm(setLogin)} placeholder="you@example.com or phone number" autoComplete="username" />
                  <div>
                    <Field label="Password" type="password" name="password" value={login.password} onChange={updateForm(setLogin)} placeholder="Enter your password" autoComplete="current-password" />
                    <a className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700" href="#top">Forgot password?</a>
                  </div>
                </>
              )}
              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>}
              {notice && <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700" role="status">{notice}</p>}
              <button disabled={isSubmitting} className="w-full rounded-xl bg-indigo-700 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-700/25 transition hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60" type="submit">
                {isSubmitting ? 'Please wait...' : mode === 'register' ? 'Create account' : 'Log in'}
              </button>
            </form>
            <p className="mt-7 text-center text-sm text-slate-500">
              {mode === 'register' ? 'Already have an account?' : 'New to HireFlow?'}{' '}
              <button className="font-semibold text-indigo-600 hover:text-indigo-700" onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setNotice(''); setError('') }} type="button">
                {mode === 'register' ? 'Log in' : 'Create an account'}
              </button>
            </p>
            </>}
          </div>
        </div>
      </section>
    </main>
  )
}
