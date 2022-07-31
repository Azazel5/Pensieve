// Installed packages
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

// Custom functions/modules
const { writeBlobToFile } = require('./utils/fileHandling/fileHandling')

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
    // Make sure req file buffer buffer exists else return from here
    const extractedMemoryBlobUrl = req.file.buffer.buffer
    const response = writeBlobToFile(extractedMemoryBlobUrl)

    if (response) {
        return res.status(200).send({
            message: 'Successfully extracted pensieve!'
        })
    }

    else {
        return res.status(500).send({
            message: 'Something went wrong extracting pensieve...'
        })
    }
})

app.get('/view', (req, res) => {

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})