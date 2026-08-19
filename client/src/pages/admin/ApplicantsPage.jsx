import React, { useEffect, useState } from 'react'
import { adminApi } from '../../features/admin/api/adminApi'
import ApplicantTable from '../../features/admin/ApplicantTable'
import { Search } from 'lucide-react'

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchApplicants = () => {
    setLoading(true)
    adminApi
      .getApplicants({ search, page, limit: 10 })
      .then((res) => {
        setApplicants(res.applicants)
        setPagination(res.pagination)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch candidate directory')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchApplicants()
  }, [page])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchApplicants()
  }

  const handleToggleStatus = (id) => {
    adminApi
      .toggleApplicantStatus(id)
      .then(() => {
        fetchApplicants()
      })
      .catch((err) => {
        alert(err.message || 'Failed to toggle status')
      })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Candidates Directory</h1>
        <p className="text-slate-400 text-sm mt-1">View applicant profiles and manage account activity status.</p>
      </div>

      {/* Search Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search candidates by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </form>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Loading candidate directory...</div>
      ) : (
        <ApplicantTable
          applicants={applicants}
          pagination={pagination}
          onPageChange={setPage}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  )
}
