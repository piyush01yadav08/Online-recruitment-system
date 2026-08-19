import React, { useEffect, useState } from 'react'
import { adminApi } from '../../features/admin/api/adminApi'
import ApplicationTable from '../../features/admin/ApplicationTable'
import { Filter } from 'lucide-react'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [jobs, setJobs] = useState([])

  const [jobPost, setJobPost] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    adminApi
      .getJobPosts({ limit: 100 })
      .then((res) => setJobs(res.jobs))
      .catch((err) => console.error('Failed to load filter jobs', err))
  }, [])

  const fetchApplications = () => {
    setLoading(true)
    adminApi
      .getApplications({ jobPost, status, page, limit: 10 })
      .then((res) => {
        setApplications(res.applications)
        setPagination(res.pagination)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch candidate applications')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchApplications()
  }, [jobPost, status, page])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Job Applications</h1>
        <p className="text-slate-400 text-sm mt-1">Review candidate applications and update statuses.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 flex-1">
          <Filter className="h-4.5 w-4.5 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600">Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={jobPost}
            onChange={(e) => {
              setJobPost(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          >
            <option value="">All Job Posts</option>
            {jobs.map((j) => (
              <option key={j._id} value={j._id}>
                {j.title} ({j.department})
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Loading applications...</div>
      ) : (
        <ApplicationTable
          applications={applications}
          pagination={pagination}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
