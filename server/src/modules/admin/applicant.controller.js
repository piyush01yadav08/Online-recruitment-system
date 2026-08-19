import User from '../../models/User.js'
import Application from '../../models/Application.js'

export async function getApplicants(request, response, next) {
  try {
    const { search, page = 1, limit = 10 } = request.query
    const query = { role: 'applicant' }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
      ]
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const total = await User.countDocuments(query)
    const applicantsDoc = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const applicants = applicantsDoc.map((user) => user.toSafeObject())

    return response.json({
      applicants,
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

export async function getApplicantById(request, response, next) {
  try {
    const { id } = request.params
    const user = await User.findOne({ _id: id, role: 'applicant' })
    if (!user) {
      return response.status(404).json({ message: 'Applicant not found' })
    }

    const applications = await Application.find({ applicant: id })
      .populate('jobPost', 'title department status location')
      .sort({ createdAt: -1 })

    return response.json({
      applicant: user.toSafeObject(),
      applications,
    })
  } catch (error) {
    next(error)
  }
}

export async function toggleApplicantStatus(request, response, next) {
  try {
    const { id } = request.params
    const user = await User.findOne({ _id: id, role: 'applicant' })
    if (!user) {
      return response.status(404).json({ message: 'Applicant not found' })
    }

    user.isActive = !user.isActive
    await user.save()

    return response.json({
      message: `Applicant status toggled successfully. Active: ${user.isActive}`,
      applicant: user.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
}
