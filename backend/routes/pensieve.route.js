// Installed packages
import express from 'express'
import multer from 'multer'

// Custom packages
import controller from '../controllers/pensieve.controller.js'

const router = express.Router()
const upload = multer()

router
    .route('/extract')
    .post(upload.single('file'), controller.extract)

export default router
