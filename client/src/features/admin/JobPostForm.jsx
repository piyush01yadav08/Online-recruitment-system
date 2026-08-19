import React, { useState, useEffect } from 'react'

const initialJobState = {
  title: '',
  description: '',
  department: '',
  location: '',
  employmentType: 'full-time',
  salary: { min: '', max: '' },
  skillsRequired: '',
  experienceLevel: '',
  openings: 1,
  deadline: '',
  status: 'draft',
}

export default function JobPostForm({ initialData = null, onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialJobState)

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialJobState,
        ...initialData,
        salary: {
          min: initialData.salary?.min ?? '',
          max: initialData.salary?.max ?? '',
        },
        skillsRequired: Array.isArray(initialData.skillsRequired)
          ? initialData.skillsRequired.join(', ')
          : '',
        deadline: initialData.deadline
          ? new Date(initialData.deadline).toISOString().split('T')[0]
          : '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((curr) => ({ ...curr, [name]: value }))
  }

  const handleSalaryChange = (e) => {
    const { name, value } = e.target
    setForm((curr) => ({
      ...curr,
      salary: { ...curr.salary, [name]: value },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      openings: parseInt(form.openings) || 1,
      salary: {
        min: form.salary.min !== '' ? parseFloat(form.salary.min) : undefined,
        max: form.salary.max !== '' ? parseFloat(form.salary.max) : undefined,
      },
      skillsRequired: form.skillsRequired
        ? form.skillsRequired.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      deadline: form.deadline ? new Date(form.deadline) : undefined,
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Job Title *</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            required
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Description *</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Provide a detailed job description..."
            rows="6"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Department</span>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="e.g. Engineering"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Location</span>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA or Remote"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Employment Type</span>
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Experience Level</span>
          <input
            type="text"
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            placeholder="e.g. Mid-Senior, 3+ years"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <div className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Salary Range</span>
          <div className="grid gap-4 grid-cols-2">
            <input
              type="number"
              name="min"
              value={form.salary.min}
              onChange={handleSalaryChange}
              placeholder="Minimum (e.g. 80000)"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <input
              type="number"
              name="max"
              value={form.salary.max}
              onChange={handleSalaryChange}
              placeholder="Maximum (e.g. 120000)"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Skills Required (comma-separated)</span>
          <input
            type="text"
            name="skillsRequired"
            value={form.skillsRequired}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, Mongoose, CSS"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Openings</span>
          <input
            type="number"
            name="openings"
            value={form.openings}
            onChange={handleChange}
            min="1"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Deadline</span>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Publication Status</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="draft">Draft</option>
            <option value="open">Open / Publish</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/15 transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Job Post' : 'Create Job Post'}
        </button>
      </div>
    </form>
  )
}
