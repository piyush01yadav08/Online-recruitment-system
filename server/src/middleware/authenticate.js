import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function authenticate(request, response, next) {
  try {
    const authorization = request.headers.authorization || ''
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null
    if (!token) return response.status(401).json({ message: 'Authentication is required.' })

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub)
    if (!user) return response.status(401).json({ message: 'This account no longer exists.' })

    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ message: 'Your session is invalid or has expired. Please log in again.' })
  }
}
