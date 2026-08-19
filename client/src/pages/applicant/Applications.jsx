import { useEffect, useState } from "react";

export default function Applications() {
  const [submittedApplication, setSubmittedApplication] = useState(null);

useEffect(() => {
  const saved = localStorage.getItem("applicationSubmitted");

  if (saved) {
    setSubmittedApplication(JSON.parse(saved));
  }
}, []);
  const [filter, setFilter] = useState("All");

  const applications = [
    {
      id: 1,
      job: "Frontend Developer",
      company: "Tech Solutions India",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹6–10 LPA",
      applied: "18 Aug 2026",
      status: "Under Review",
    },
    {
      id: 2,
      job: "React Developer",
      company: "Digital Works",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹5–8 LPA",
      applied: "15 Aug 2026",
      status: "Shortlisted",
    },
    {
      id: 3,
      job: "UI/UX Designer",
      company: "Creative Labs",
      location: "Remote",
      type: "Remote",
      salary: "₹4–7 LPA",
      applied: "12 Aug 2026",
      status: "Applied",
    },
    {
      id: 4,
      job: "Software Engineer",
      company: "Innovate Technologies",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹8–14 LPA",
      applied: "8 Aug 2026",
      status: "Rejected",
    },
  ];

  const allApplications = submittedApplication
  ? [submittedApplication, ...applications]
  : applications;

const filteredApplications =
  filter === "All"
    ? allApplications
    : allApplications.filter(
        (application) => application.status === filter
      );

  const statusStyle = {
    Applied: "bg-blue-50 text-blue-700",
    "Under Review": "bg-yellow-50 text-yellow-700",
    Shortlisted: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              OR
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                My Applications
              </h1>
              <p className="text-xs text-slate-500">
                Track your job applications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-slate-100">
              🔔
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              PA
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            My Applications
          </h2>

          <p className="mt-2 text-slate-500">
            Track and manage all your job applications in one place.
          </p>
        </div>

     {/* Statistics */}
<section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-slate-500">Total Applications</p>
    <p className="mt-2 text-3xl font-bold text-slate-900">
      {allApplications.length}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-slate-500">Under Review</p>
    <p className="mt-2 text-3xl font-bold text-yellow-600">
      {allApplications.filter((app) => app.status === "Under Review").length}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-slate-500">Shortlisted</p>
    <p className="mt-2 text-3xl font-bold text-green-600">
      {allApplications.filter((app) => app.status === "Shortlisted").length}
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-slate-500">Rejected</p>
    <p className="mt-2 text-3xl font-bold text-red-600">
      {allApplications.filter((app) => app.status === "Rejected").length}
    </p>
  </div>
</section>

        {/* Filters */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap gap-2">
            {["All", "Applied", "Under Review", "Shortlisted", "Rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </section>

        {/* Applications */}
        <section className="mt-5 space-y-4">
          {filteredApplications.map((application) => (
            <article
              key={application.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    💼
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">
                        {application.job}
                      </h3>

                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                          statusStyle[application.status]
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>

                    <p className="mt-1 font-medium text-slate-600">
                      {application.company}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>📍 {application.location}</span>
                      <span>💼 {application.type}</span>
                      <span>💰 {application.salary}</span>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      Applied on {application.applied}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    View Job
                  </button>

                  <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                    View Application
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Empty state */}
        {filteredApplications.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-4xl">📄</div>

            <h3 className="mt-4 font-bold text-slate-900">
              No applications found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You don't have any applications with this status.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}