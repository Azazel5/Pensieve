// Installed packages
import express from 'express'

// Custom packages
import pensieveRoutes from './pensieve.route.js'

const router = express.Router()

// Routes
router.use('/pensieve', pensieveRoutes)

export default router