// Installed packages
const express = require('express')
const cors = require('cors')

const app = express()
const port = 8000

// CORS config
const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors())

// Routes
app.post('/extract', (req, res) => {
    console.log(req.body.url)

    return res.status(200).send({
        hey: 'here'
    })
})

app.get('/view', (req, res) => {

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})