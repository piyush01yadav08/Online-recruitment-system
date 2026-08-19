export default function Dashboard() {
  const stats = [
    { label: "Applications", value: "12", icon: "📄" },
    { label: "Saved Jobs", value: "8", icon: "🔖" },
    { label: "Profile Views", value: "24", icon: "👁️" },
    { label: "Interviews", value: "3", icon: "📅" },
  ];

  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Bangalore, India",
      salary: "₹6–10 LPA",
      type: "Full-time",
    },
    {
      title: "React Developer",
      company: "Digital Works",
      location: "Hyderabad, India",
      salary: "₹5–8 LPA",
      type: "Full-time",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Labs",
      location: "Remote",
      salary: "₹4–7 LPA",
      type: "Remote",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Applicant Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage your career and applications
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-slate-100">
              🔔
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                PA
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Piyar Ali</p>
                <p className="text-xs text-slate-500">Applicant</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            {[
              ["🏠", "Dashboard", true],
              ["🔎", "Find Jobs", false],
              ["📄", "My Applications", false],
              ["🔖", "Saved Jobs", false],
              ["👤", "My Profile", false],
              ["⚙️", "Settings", false],
            ].map(([icon, label, active]) => (
              <button
                key={label}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Welcome */}
          <section className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
            <p className="text-sm text-blue-100">Welcome back 👋</p>

            <h2 className="mt-1 text-2xl font-bold">
              Ready for your next opportunity?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              Complete your profile and explore jobs that match your skills
              and career goals.
            </p>

            <button className="mt-5 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Complete Profile
            </button>
          </section>

          {/* Stats */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Jobs */}
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recommended Jobs</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Jobs that may be a good match for you
                </p>
              </div>

              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all →
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {jobs.map((job) => (
                <article
                  key={job.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                        💼
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                          {job.company}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span>📍 {job.location}</span>
                          <span>💰 {job.salary}</span>
                          <span>● {job.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        🔖
                      </button>

                      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        View Job
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Profile completion */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold">Complete your profile</h2>
                <p className="mt-1 text-sm text-slate-500">
                  A complete profile helps employers understand your skills.
                </p>
              </div>

              <span className="text-2xl font-bold text-blue-600">75%</span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-3/4 rounded-full bg-blue-600" />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Add your education and work experience to reach 100%.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}