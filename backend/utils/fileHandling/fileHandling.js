// Default packages
import fs from 'fs'

// Installed packages
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'

// Custom packages
import { client } from '../mongoDB/connection.js'

async function validateFileType(file) {
    // Validate the file/field names and mimetype
    // Also use the file-type library to check the file magic bytes to make sure
    // it matches a video/webm type which is returned by react-media-recorder

    const { ext, mime } = await fileTypeFromBuffer(file.buffer.buffer)
    const { fieldname, mimetype, originalname } = file
    return (
        ext === 'webm' && mime === 'video/webm' && fieldname === 'file' &&
        originalname === 'audiofile.mp4' && (mimetype === 'audio/mp4' || mimetype === 'video/mp4')
    )
}

async function writeBlobToFile(req) {
    // Get blob from req.file. If this doesn't exist, return straight away
    // Validate the blob. If validation doesn't pass return straight away
    // Convert blob to Buffer and write to file system
    // If any error thrown, return a 500 status code

    try {
        const blob = req?.file?.buffer?.buffer

        if (!blob) {
            return [400, 'Pensieve file buffer not present']
        }

        if (!await validateFileType(req.file)) {
            return [400, 'Incorrect pensieve file buffer']
        }

        const blobBuffer = Buffer.from(blob)
        fs.writeFile('pensieve.mp4', blobBuffer, err => {
            if (err) {
                throw err
            }
        })
        
        return [200, 'Successully extracted pensieve!']
    }

    catch (error) {
        throw ([
            500,
            'Something went wrong extracting pensieve...'
        ])
    }
}

export {
    writeBlobToFile
}