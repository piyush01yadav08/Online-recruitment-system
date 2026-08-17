import jwt from 'jsonwebtoken'
import User, { normalizePhone } from '../models/User.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[0-9]{7,15}$/

function createToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function authResponse(user, statusCode, response) {
  response.status(statusCode).json({ token: createToken(user), user: user.toSafeObject() })
}

export async function register(request, response, next) {
  try {
    const { name, email, phone, password } = request.body
    const normalizedEmail = email?.trim().toLowerCase()
    const normalizedPhone = phone ? normalizePhone(phone) : ''

    if (!name?.trim() || !normalizedEmail || !normalizedPhone || !password) {
      return response.status(400).json({ message: 'Name, email, phone number, and password are required.' })
    }
    if (!emailPattern.test(normalizedEmail)) {
      return response.status(400).json({ message: 'Enter a valid email address.' })
    }
    if (!phonePattern.test(normalizedPhone)) {
      return response.status(400).json({ message: 'Enter a valid phone number including country code if applicable.' })
    }
    if (password.length < 8) {
      return response.status(400).json({ message: 'Password must be at least 8 characters long.' })
    }

    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { phone: normalizedPhone }] })
    if (existingUser) {
      return response.status(409).json({ message: 'An account already exists with this email address or phone number.' })
    }

    const user = await User.create({ name, email: normalizedEmail, phone: normalizedPhone, password })
    return authResponse(user, 201, response)
  } catch (error) {
    next(error)
  }
}

export async function login(request, response, next) {
  try {
    const { identifier, password } = request.body
    if (!identifier?.trim() || !password) {
      return response.status(400).json({ message: 'Email or phone number and password are required.' })
    }

    const value = identifier.trim()
    const query = value.includes('@') ? { email: value.toLowerCase() } : { phone: normalizePhone(value) }
    const user = await User.findOne(query).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return response.status(401).json({ message: 'Invalid email or phone number, or password.' })
    }

    return authResponse(user, 200, response)
  } catch (error) {
    next(error)
  }
}

export async function currentUser(request, response) {
  response.json({ user: request.user.toSafeObject() })
}
