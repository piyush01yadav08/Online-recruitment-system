import React, { useState } from 'react'
import { User, Briefcase, FileText, Clock } from 'lucide-react'

export default function ApplicationDetailPanel({
  application,
  onUpdateStatus,
  onUpdateNotes,
  isUpdatingStatus,
  isUpdatingNotes,
}) {
  const [notes, setNotes] = useState(application.adminNotes || '')

  const handleNotesSubmit = (e) => {
    e.preventDefault()
    onUpdateNotes(notes)
  }

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
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Candidate Profile Summary */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-indigo-500" /> Candidate Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <p className="text-slate-400 font-medium">Full Name</p>
              <p className="mt-1 font-semibold text-slate-800">{application.applicant?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Email Address</p>
              <p className="mt-1 font-semibold text-slate-800">{application.applicant?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Phone Number</p>
              <p className="mt-1 font-semibold text-slate-800">{application.applicant?.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Applied At</p>
              <p className="mt-1 font-semibold text-slate-800">
                {application.appliedAt ? new Date(application.appliedAt).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-indigo-500" /> Applied Job Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm mb-4">
            <div>
              <p className="text-slate-400 font-medium">Job Title</p>
              <p className="mt-1 font-semibold text-slate-800">{application.jobPost?.title || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Department</p>
              <p className="mt-1 font-semibold text-slate-800">{application.jobPost?.department || 'N/A'}</p>
            </div>
          </div>
          {application.jobPost?.skillsRequired?.length > 0 && (
            <div className="text-sm">
              <p className="text-slate-400 font-medium mb-1.5">Required Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {application.jobPost.skillsRequired.map((skill, index) => (
                  <span key={index} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Application Content (Resume/Cover Letter) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-indigo-500" /> Application Details
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-400 font-medium">Resume Link</p>
              {application.resumeUrl ? (
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  <FileText className="h-4 w-4" /> View Resume File
                </a>
              ) : (
                <p className="mt-1 text-slate-500 italic">No resume uploaded</p>
              )}
            </div>
            <div>
              <p className="text-slate-400 font-medium">Cover Letter</p>
              <p className="mt-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100 whitespace-pre-line text-slate-700 leading-relaxed">
                {application.coverLetter || 'No cover letter provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: Status Update & Admin Notes & Timeline */}
      <div className="space-y-6">
        {/* Status Transition Control */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Current Status</h3>
          <div className="mb-4">
            <span
              className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold uppercase tracking-wider ${getStatusBadge(application.status)}`}
            >
              {application.status}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Transition Status</p>
          <div className="grid gap-2">
            {['pending', 'shortlisted', 'interview', 'hired', 'rejected'].map((st) => (
              <button
                key={st}
                disabled={isUpdatingStatus || application.status === st}
                onClick={() => onUpdateStatus(st)}
                className={`w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold capitalize border transition ${
                  application.status === st
                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Admin Notes Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4">Internal Admin Notes</h3>
          <form onSubmit={handleNotesSubmit} className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add interview feedback, notes..."
              rows="4"
              className="w-full text-sm rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <button
              type="submit"
              disabled={isUpdatingNotes || notes === (application.adminNotes || '')}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition disabled:opacity-50"
            >
              {isUpdatingNotes ? 'Saving...' : 'Save Notes'}
            </button>
          </form>
        </div>

        {/* Status History Timeline */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="h-4.5 w-4.5 text-indigo-500" /> Status Timeline
          </h3>
          <div className="space-y-4">
            {application.statusHistory && application.statusHistory.length > 0 ? (
              application.statusHistory.map((history, index) => (
                <div key={index} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <span className="h-2 w-2 rounded-full bg-indigo-600 mt-1.5" />
                    {index < application.statusHistory.length - 1 && (
                      <span className="w-0.5 grow bg-slate-100 my-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-slate-800 capitalize">{history.status}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">
                      {history.changedAt ? new Date(history.changedAt).toLocaleString() : ''}
                    </p>
                    {history.changedBy && (
                      <p className="text-slate-500 text-[10px] mt-0.5">
                        By: {history.changedBy.name || history.changedBy}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No status changes logged.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
