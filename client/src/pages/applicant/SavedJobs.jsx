import { useEffect, useState } from "react";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");

    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);

    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
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
              <h1 className="font-bold text-slate-900">Saved Jobs</h1>
              <p className="text-xs text-slate-500">
                Jobs you've saved for later
              </p>
            </div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            PA
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Saved Jobs
          </h2>

          <p className="mt-2 text-slate-500">
            Keep track of jobs you want to apply for later.
          </p>
        </div>

        {savedJobs.length > 0 ? (
          <section className="mt-8 space-y-4">
            {savedJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      💼
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 font-medium text-slate-600">
                        {job.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>💰 {job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-5xl">🔖</div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No saved jobs yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              When you find an interesting job, save it here so you can
              come back to it later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}