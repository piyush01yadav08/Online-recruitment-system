export function isAdmin(request, response, next) {
  if (!request.user || request.user.role !== 'admin') {
    return response.status(403).json({ message: 'Access denied. Administrator privileges required.' })
  }
  next()
}
