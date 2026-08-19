import React from 'react'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'

export default function ApplicationTable({
  applications = [],
  pagination = {},
  onPageChange,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'shortlisted':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'interview':
        return 'bg-purple-50 text-purple-700 border-purple-100'
      case 'hired':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-100'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-sm font-semibold text-slate-500">
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Job Post</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Applied Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{app.applicant?.name || 'N/A'}</p>
                      <p className="text-xs text-slate-400">{app.applicant?.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{app.jobPost?.title || 'N/A'}</td>
                  <td className="px-6 py-4">{app.jobPost?.department || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusBadge(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/applications/${app._id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/30">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
