export default function Apply() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <h1 className="text-xl font-bold text-slate-900">
            Apply for Job
          </h1>
          <p className="text-sm text-slate-500">
            Complete your application
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold">Job Application</h2>

          <div className="mt-6 grid gap-5">
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Resume</label>
              <input
                type="file"
                className="mt-2 w-full rounded-lg border border-slate-300 p-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Cover Letter
              </label>
              <textarea
                rows="6"
                placeholder="Write your cover letter..."
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
          onClick={() => {
  localStorage.setItem(
    "applicationSubmitted",
    JSON.stringify({
      job: "Frontend Developer",
      company: "Tech Solutions India",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹6–10 LPA",
      applied: new Date().toLocaleDateString(),
      status: "Applied",
    })
  );

  alert("Application submitted successfully!");
  window.location.href = "/applicant/applications";
}}
              className="rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}