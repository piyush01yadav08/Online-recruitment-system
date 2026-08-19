const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('hireflow_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  return data
}

export const adminApi = {
  // Dashboard
  getDashboardSummary: () => request('/admin/dashboard'),

  // Job Posts
  getJobPosts: (params = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value)
      }
    })
    const query = searchParams.toString()
    return request(`/admin/jobs${query ? `?${query}` : ''}`)
  },
  getJobPostById: (id) => request(`/admin/jobs/${id}`),
  createJobPost: (data) => request('/admin/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJobPost: (id, data) => request(`/admin/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJobPost: (id) => request(`/admin/jobs/${id}`, { method: 'DELETE' }),

  // Applications
  getApplications: (params = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value)
      }
    })
    const query = searchParams.toString()
    return request(`/admin/applications${query ? `?${query}` : ''}`)
  },
  getApplicationById: (id) => request(`/admin/applications/${id}`),
  updateApplicationStatus: (id, status) =>
    request(`/admin/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  updateApplicationNotes: (id, adminNotes) =>
    request(`/admin/applications/${id}/notes`, {
      method: 'PUT',
      body: JSON.stringify({ adminNotes }),
    }),

  // Applicants
  getApplicants: (params = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value)
      }
    })
    const query = searchParams.toString()
    return request(`/admin/applicants${query ? `?${query}` : ''}`)
  },
  getApplicantById: (id) => request(`/admin/applicants/${id}`),
  toggleApplicantStatus: (id) => request(`/admin/applicants/${id}/toggle-status`, { method: 'PUT' }),
}
