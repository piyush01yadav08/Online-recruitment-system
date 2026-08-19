import Application from '../../models/Application.js'

export async function getApplications(request, response, next) {
  try {
    const { jobPost, status, startDate, endDate, page = 1, limit = 10 } = request.query
    const query = {}

    if (jobPost) query.jobPost = jobPost
    if (status) query.status = status
    if (startDate || endDate) {
      query.appliedAt = {}
      if (startDate) query.appliedAt.$gte = new Date(startDate)
      if (endDate) query.appliedAt.$lte = new Date(endDate)
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const total = await Application.countDocuments(query)
    const applications = await Application.find(query)
      .populate('applicant', 'name email phone')
      .populate('jobPost', 'title department')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    return response.json({
      applications,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getApplicationById(request, response, next) {
  try {
    const { id } = request.params
    const application = await Application.findById(id)
      .populate('applicant', 'name email phone')
      .populate('jobPost', 'title department description location skillsRequired')
      .populate('statusHistory.changedBy', 'name email')

    if (!application) {
      return response.status(404).json({ message: 'Application not found' })
    }

    return response.json(application)
  } catch (error) {
    next(error)
  }
}

export async function updateApplicationStatus(request, response, next) {
  try {
    const { id } = request.params
    const { status } = request.body

    const application = await Application.findById(id)
    if (!application) {
      return response.status(404).json({ message: 'Application not found' })
    }

    application.status = status
    application._changedBy = request.user._id
    await application.save()

    await application.populate([
      { path: 'applicant', select: 'name email phone' },
      { path: 'jobPost', select: 'title department' },
      { path: 'statusHistory.changedBy', select: 'name email' },
    ])

    return response.json(application)
  } catch (error) {
    next(error)
  }
}

export async function updateApplicationNotes(request, response, next) {
  try {
    const { id } = request.params
    const { adminNotes } = request.body

    const application = await Application.findByIdAndUpdate(id, { adminNotes }, { new: true })
      .populate('applicant', 'name email phone')
      .populate('jobPost', 'title department')
      .populate('statusHistory.changedBy', 'name email')

    if (!application) {
      return response.status(404).json({ message: 'Application not found' })
    }

    return response.json(application)
  } catch (error) {
    next(error)
  }
}
