import 'dotenv/config'

// Custom functions/modules
import constants from './constants/index.js'
import app from './config/express.config.js'

app.listen(constants.PORT, () => {
    console.log(`Server running on port ${constants.PORT}`)
})