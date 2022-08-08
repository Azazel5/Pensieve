// Default packages
import bodyParser from 'body-parser'

// Installed packages
import express from 'express'
import cors from 'cors'

// Custom packages
import corsOptions from './cors.config.js'
import routes from '../routes/index.js'

// Instantiations
const app = express()

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// CORS
app.use(cors(corsOptions))

app.use(routes)

export default app