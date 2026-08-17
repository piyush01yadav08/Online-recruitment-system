import mongoose from 'mongoose'

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add your MongoDB Atlas connection string to .env.')
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB.')
}
