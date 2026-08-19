import { useState } from "react";
import Dashboard from "./pages/applicant/Dashboard";
import Jobs from "./pages/applicant/Jobs";
import JobDetails from "./pages/applicant/JobDetails";
import Applications from "./pages/applicant/Applications";
import Apply from "./pages/applicant/Apply";
import SavedJobs from "./pages/applicant/SavedJobs";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              OR
            </div>

            <div>
              <h1 className="text-lg font-bold">Online Recruitment</h1>
              <p className="text-xs text-slate-500">Find your next opportunity</p>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium text-blue-600">
              Home
            </a>
            <Link
  to="/applicant/jobs"
  className="text-sm font-medium text-slate-600 hover:text-blue-600"
>
  Find Jobs
</Link>
            <a
              href="#companies"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Companies
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
  to="/login"
  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
>
  Login
</Link>
            <Link
  to="/register"
  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
>
  Register
</Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="#" className="font-medium text-blue-600">
                Home
              </a>
              <a href="#jobs" className="font-medium text-slate-600">
                Find Jobs
              </a>
              <a href="#companies" className="font-medium text-slate-600">
                Companies
              </a>
              <a href="#about" className="font-medium text-slate-600">
                About
              </a>

              <div className="mt-2 flex gap-3 border-t pt-4">
                <button className="flex-1 rounded-lg border border-slate-300 py-2 font-semibold">
                  Login
                </button>
                <button className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white">
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <div className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                🚀 Your career starts here
              </div>

              <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find the right job.
                <span className="block text-blue-600">
                  Build your future.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Discover opportunities from trusted employers and take the
                next step in your career with our online recruitment platform.
              </p>

              {/* Search */}
              <div
                id="jobs"
                className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/60"
              >
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <div className="flex items-center rounded-xl bg-slate-50 px-4">
                    <span className="mr-3 text-lg">⌕</span>
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      className="w-full bg-transparent py-3 text-sm outline-none"
                    />
                  </div>

                  <div className="flex items-center rounded-xl bg-slate-50 px-4">
                    <span className="mr-3 text-lg">⌖</span>
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full bg-transparent py-3 text-sm outline-none"
                    />
                  </div>

                  <button className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700">
                    Search Jobs
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
                <span>✓ Verified employers</span>
                <span>✓ Easy applications</span>
                <span>✓ Free for applicants</span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-blue-100 blur-2xl" />
              <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-indigo-100 blur-2xl" />

              <div className="relative rounded-3xl bg-slate-900 p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Career dashboard</p>
                    <p className="mt-1 text-xl font-bold text-white">
                      Welcome back 👋
                    </p>
                  </div>

                  <div className="h-11 w-11 rounded-full bg-blue-500" />
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Recommended job</p>
                      <h3 className="mt-1 font-bold">Frontend Developer</h3>
                    </div>

                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      New
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs">
                      React
                    </span>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs">
                      JavaScript
                    </span>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs">
                      Remote
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <span className="text-sm font-semibold">₹6–10 LPA</span>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                      View Job
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Applications</p>
                    <p className="mt-2 text-2xl font-bold text-white">12</p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Saved Jobs</p>
                    <p className="mt-2 text-2xl font-bold text-white">8</p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Profile</p>
                    <p className="mt-2 text-2xl font-bold text-white">85%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular categories */}
        <section className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Explore opportunities
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Popular job categories
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Explore jobs across different industries and find an
                opportunity that matches your skills.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["💻", "Technology", "1,240 jobs"],
                ["📊", "Finance", "680 jobs"],
                ["📣", "Marketing", "520 jobs"],
                ["🏥", "Healthcare", "430 jobs"],
                ["🎨", "Design", "310 jobs"],
                ["🏗️", "Engineering", "760 jobs"],
                ["📚", "Education", "290 jobs"],
                ["🛒", "Sales", "610 jobs"],
              ].map(([icon, title, jobs]) => (
                <button
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    {icon}
                  </div>
                  <h3 className="mt-5 font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{jobs}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="about" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {[
                [
                  "01",
                  "Discover jobs",
                  "Search and explore thousands of opportunities based on your skills, location and career goals.",
                ],
                [
                  "02",
                  "Apply easily",
                  "Create your profile once and use it to apply for suitable jobs quickly.",
                ],
                [
                  "03",
                  "Track applications",
                  "Keep everything organized and monitor the status of your applications from one dashboard.",
                ],
              ].map(([number, title, description]) => (
                <div key={number}>
                  <span className="text-sm font-bold text-blue-600">
                    {number}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-white">Online Recruitment System</p>
            <p className="mt-1 text-sm">
              Connecting talented people with great opportunities.
            </p>
          </div>

          <p className="text-sm">
            © 2026 Online Recruitment System. All rights reserved.
          </p>
        </div>
      </footer>
            </div>
          }
        />

        <Route path="/applicant/dashboard" element={<Dashboard />} />
        <Route path="/applicant/jobs" element={<Jobs />} />
        <Route path="/applicant/jobs/1" element={<JobDetails />} />
        <Route path="/applicant/apply" element={<Apply />} />
        <Route path="/applicant/saved-jobs" element={<SavedJobs />} />
        <Route
  path="/applicant/applications"
  element={<Applications />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;