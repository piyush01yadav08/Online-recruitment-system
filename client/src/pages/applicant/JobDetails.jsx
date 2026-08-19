import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function JobDetails() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

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
                Online Recruitment
              </h1>
              <p className="text-xs text-slate-500">
                Find your next opportunity
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
        {/* Back */}
        <button className="mb-6 text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to Jobs
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Main job information */}
          <div className="space-y-6">
            {/* Job header */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  💼
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Frontend Developer
                    </h2>

                    <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      Actively hiring
                    </span>
                  </div>

                  <p className="mt-2 font-medium text-slate-600">
                    Tech Solutions India
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span>📍 Bangalore, India</span>
                    <span>💼 Full-time</span>
                    <span>💰 ₹6–10 LPA</span>
                  </div>

                  <p className="mt-4 text-sm text-slate-400">
                    Posted 2 days ago
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                [23:40, 18/08/2026] Ali: import { useNavigate } from "react-router-dom";
[23:43, 18/08/2026] Ali: <button
  onClick={() => navigate("/applicant/apply")}
  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
>
  Apply Now
</button>
                <button
                  onClick={() => setSaved(!saved)}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {saved ? "🔖 Saved" : "🔖 Save Job"}
                </button>
              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Job Description
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                We are looking for a talented Frontend Developer to join our
                growing engineering team. You will work closely with designers,
                backend engineers and product managers to build modern,
                responsive and user-friendly web applications.
              </p>

              <p className="mt-4 leading-7 text-slate-600">
                The ideal candidate has a strong understanding of modern
                JavaScript, React and responsive web development. You should
                enjoy solving problems and building products that provide a
                great user experience.
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Responsibilities
              </h3>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  Build responsive web applications using React.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  Collaborate with designers and backend developers.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  Write clean, maintainable and reusable code.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  Optimize applications for performance and accessibility.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  Participate in code reviews and technical discussions.
                </li>
              </ul>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Requirements
              </h3>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  1–3 years of experience in frontend development.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  Strong knowledge of JavaScript and React.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  Good understanding of HTML and CSS.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  Experience with Git and modern development tools.
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">•</span>
                  Good communication and problem-solving skills.
                </li>
              </ul>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Required Skills
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "HTML",
                  "CSS",
                  "Tailwind CSS",
                  "Git",
                  "REST API",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                Benefits
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["🏥", "Health insurance"],
                  ["🏖️", "Paid vacation"],
                  ["🏠", "Remote flexibility"],
                  ["📚", "Learning budget"],
                  ["💻", "Modern equipment"],
                  ["🎯", "Performance bonus"],
                ].map(([icon, benefit]) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium text-slate-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Apply card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
              <h3 className="text-lg font-bold">Interested in this job?</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Apply now and take the next step toward your career.
              </p>

             [23:40, 18/08/2026] Ali: import { useNavigate } from "react-router-dom";
[23:43, 18/08/2026] Ali: <button
  onClick={() => navigate("/applicant/apply")}
  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
>
  Apply Now
</button>

              <button
                onClick={() => setSaved(!saved)}
                className="mt-3 w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {saved ? "🔖 Job Saved" : "🔖 Save Job"}
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                Your profile will be shared with the employer.
              </p>
            </div>

            {/* Company card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">
                  TS
                </div>

                <div>
                  <h3 className="font-bold">Tech Solutions India</h3>
                  <p className="text-xs text-slate-500">Technology</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Building digital products and technology solutions for
                businesses across India.
              </p>

              <button className="mt-4 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                View Company
              </button>
            </div>

            {/* Job summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold">Job Overview</h3>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Job Type</p>
                  <p className="mt-1 text-sm font-semibold">Full-time</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Experience</p>
                  <p className="mt-1 text-sm font-semibold">1–3 years</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Salary</p>
                  <p className="mt-1 text-sm font-semibold">₹6–10 LPA</p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="mt-1 text-sm font-semibold">
                    Bangalore, India
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Department</p>
                  <p className="mt-1 text-sm font-semibold">Engineering</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}