// Default packages
import bodyParser from 'body-parser'

// Installed packages
import express from 'express'
import cors from 'cors'
import multer from 'multer'

// Custom functions/modules
import { writeBlobToFile } from './utils/fileHandling/fileHandling.js'

const app = express()
const port = 8000
const upload = multer()

// CORS config
const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
}

app.use(cors())

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes
app.post('/extract', upload.single('file'), async (req, res) => {
    try {
        var [statusCode, message] = await writeBlobToFile(req)
    }

    catch (error) {
        var [statusCode, message] = error
    }

    return res.status(statusCode).send({
        message
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})