// Installed packages
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import { fileTypeFromStream } from 'file-type'

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
app.post('/extract', upload.single('file'), (req, res) => {
    const extractedMemoryBlobUrl = req?.file?.buffer?.buffer
    let statusCode
    let message

    if (!extractedMemoryBlobUrl) {
        return res.status(405).send({
            message: 'Pensieve file buffer not present'
        })
    }

    try {
        writeBlobToFile(extractedMemoryBlobUrl)
        statusCode = 200
        message = 'Successully extracted pensieve!'
    }

    catch (error) {
        statusCode = 500
        message = error.message
    }

    finally {
        return res.status(statusCode).send({
            message
        })
    }
})

app.get('/view', (req, res) => {

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})