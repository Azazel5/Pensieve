import { writeBlobToFile } from '../utils/fileHandling/fileHandling.js'

async function extract(req, res) {
    try {
        var [statusCode, message] = await writeBlobToFile(req)
    }

    catch (error) {
        var [statusCode, message] = error
    }

    return res.status(statusCode).send({
        message
    })
}

export default {
    extract
}