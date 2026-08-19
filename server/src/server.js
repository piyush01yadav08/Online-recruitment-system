import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import app from './app.js'
import { connectDatabase } from './config/database.js'

const sourceDirectory = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(sourceDirectory, '../../.env') })

const port = process.env.PORT || 5000

connectDatabase()
  .then(() => app.listen(port, () => console.log(`API listening on port ${port}.`)))
  .catch((error) => {
    console.error(`Unable to start API: ${error.message}`)
    process.exit(1)
  })

// 1. For Administrator Access (Admin Dashboard)
// Email/Identifier: admin@hireflow.com
// Password: Password123!