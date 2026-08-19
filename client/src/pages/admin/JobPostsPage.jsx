import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../../features/admin/api/adminApi'
import JobPostTable from '../../features/admin/JobPostTable'
import { Plus, Search, Filter } from 'lucide-react'

export default function JobPostsPage() {
  const [jobs, setJobs] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const fetchJobs = () => {
    setLoading(true)
    adminApi
      .getJobPosts({ search, status, page, limit: 8 })
      .then((res) => {
        setJobs(res.jobs)
        setPagination(res.pagination)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch job postings')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchJobs()
  }, [page])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchJobs()
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    setPage(1)
  }

  useEffect(() => {
    fetchJobs()
  }, [status])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      adminApi
        .deleteJobPost(id)
        .then(() => {
          fetchJobs()
        })
        .catch((err) => {
          alert(err.message || 'Failed to delete job post')
        })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Job Posts</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and publish job listings.</p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> Create Job Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search jobs by title, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </form>

        <div className="flex items-center gap-3">
          <Filter className="h-4.5 w-4.5 text-slate-400" />
          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Error Info */}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Loading jobs...</div>
      ) : (
        <JobPostTable
          jobs={jobs}
          pagination={pagination}
          onPageChange={setPage}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
