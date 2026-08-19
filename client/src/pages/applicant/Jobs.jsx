import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [jobType, setJobType] = useState("All Types");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions India",
      location: "Bangalore, India",
      salary: "₹6–10 LPA",
      type: "Full-time",
      category: "Technology",
      posted: "2 days ago",
      skills: ["React", "JavaScript", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "React Developer",
      company: "Digital Works",
      location: "Hyderabad, India",
      salary: "₹5–8 LPA",
      type: "Full-time",
      category: "Technology",
      posted: "3 days ago",
      skills: ["React", "Node.js", "Git"],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Labs",
      location: "Remote",
      salary: "₹4–7 LPA",
      type: "Remote",
      category: "Design",
      posted: "1 day ago",
      skills: ["Figma", "UI Design", "UX Research"],
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Innovate Technologies",
      location: "Pune, India",
      salary: "₹8–14 LPA",
      type: "Full-time",
      category: "Technology",
      posted: "5 days ago",
      skills: ["Java", "Spring Boot", "SQL"],
    },
    {
      id: 5,
      title: "Digital Marketing Executive",
      company: "Growth Media",
      location: "Mumbai, India",
      salary: "₹3–6 LPA",
      type: "Full-time",
      category: "Marketing",
      posted: "4 days ago",
      skills: ["SEO", "Social Media", "Google Ads"],
    },
    {
      id: 6,
      title: "Financial Analyst",
      company: "Prime Finance",
      location: "Delhi, India",
      salary: "₹5–9 LPA",
      type: "Full-time",
      category: "Finance",
      posted: "6 days ago",
      skills: ["Excel", "Financial Analysis", "SQL"],
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchesCategory =
      category === "All Categories" || job.category === category;

    const matchesType =
      jobType === "All Types" || job.type === jobType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesType
    );
  });

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
              <h1 className="font-bold">Find Jobs</h1>
              <p className="text-xs text-slate-500">
                Discover your next opportunity
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
        {/* Page heading */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Find your next job
          </h2>

          <p className="mt-2 text-slate-500">
            Explore opportunities that match your skills and experience.
          </p>
        </div>

        {/* Search section */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
              <span className="mr-3 text-lg">⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, company or skill"
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>

            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
              <span className="mr-3 text-lg">📍</span>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            >
              <option>All Categories</option>
              <option>Technology</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>

            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Job type:
            </span>

            {["All Types", "Full-time", "Remote", "Part-time"].map((type) => (
              <button
                key={type}
                onClick={() => setJobType(type)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                  jobType === type
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Results header */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {filteredJobs.length} jobs found
            </h3>

            <p className="text-sm text-slate-500">
              Showing jobs based on your search
            </p>
          </div>

          <select className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none">
            <option>Most Relevant</option>
            <option>Newest First</option>
            <option>Salary: High to Low</option>
          </select>
        </div>

        {/* Job cards */}
        <section className="mt-5 space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <article
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      💼
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>

                        <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                          {job.posted}
                        </span>
                      </div>

                      <p className="mt-1 font-medium text-slate-600">
                        {job.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary}</span>
                        <span>💼 {job.type}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
  onClick={() => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    const alreadySaved = saved.some((savedJob) => savedJob.id === job.id);

    if (!alreadySaved) {
      const updatedJobs = [...saved, job];

      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));

      alert("Job saved successfully!");
    } else {
      alert("Job is already saved!");
    }
  }}
  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
>
  🔖 Save
</button>
<button
  onClick={() => navigate(`/applicant/jobs/${job.id}`)}
  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
>
  View Job
</button>
                    
                    
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 font-bold text-slate-900">
                No jobs found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setCategory("All Categories");
                  setJobType("All Types");
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
            ← Previous
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            1
          </button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
            2
          </button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
            3
          </button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm">
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}