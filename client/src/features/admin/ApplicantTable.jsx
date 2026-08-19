import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, UserX, UserCheck } from 'lucide-react'

export default function ApplicantTable({
  applicants = [],
  pagination = {},
  onPageChange,
  onToggleStatus,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-sm font-semibold text-slate-500">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                  No applicants found.
                </td>
              </tr>
            ) : (
              applicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900">{applicant.name}</td>
                  <td className="px-6 py-4">{applicant.email}</td>
                  <td className="px-6 py-4">{applicant.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                        applicant.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-red-50 text-red-700 border-red-100'
                      }`}
                    >
                      {applicant.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/applicants/${applicant.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Profile
                      </Link>
                      <button
                        onClick={() => onToggleStatus(applicant.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition ${
                          applicant.isActive
                            ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100/70'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/70'
                        }`}
                      >
                        {applicant.isActive ? (
                          <>
                            <UserX className="h-3.5 w-3.5" /> Block
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3.5 w-3.5" /> Unblock
                          </>
                        )}
                      </button>
                    </div>
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
