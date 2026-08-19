import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminApi } from '../../features/admin/api/adminApi'
import { ArrowLeft, Mail, Phone, Shield, FileText } from 'lucide-react'

export default function ApplicantDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .getApplicantById(id)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load applicant profile')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="text-center py-12 text-slate-500 font-medium">Loading applicant details...</div>
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
  }

  const { applicant, applications } = data

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/admin/applicants"
          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-600 transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Applicant Profile</h1>
          <p className="text-slate-400 text-sm mt-0.5">Candidate resume history and details.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
            {applicant.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-800">{applicant.name}</h2>
          <span
            className={`mt-1.5 inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${
              applicant.isActive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-red-50 text-red-700 border-red-100'
            }`}
          >
            {applicant.isActive ? 'Active Candidate' : 'Blocked'}
          </span>

          <div className="w-full mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm text-left">
            <div className="flex items-center gap-3 text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="truncate">{applicant.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{applicant.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Shield className="h-4 w-4 text-slate-400" />
              <span className="capitalize">{applicant.role} Role</span>
            </div>
          </div>
        </div>

        {/* Application History */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-indigo-500" /> Application History
          </h3>

          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-sm text-slate-400 italic py-6 text-center">No applications submitted yet.</p>
            ) : (
              applications.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">{app.jobPost?.title || 'N/A'}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Applied: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'} • Dept:{' '}
                      {app.jobPost?.department || 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                        app.status,
                      )}`}
                    >
                      {app.status}
                    </span>
                    <Link
                      to={`/admin/applications/${app._id}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
