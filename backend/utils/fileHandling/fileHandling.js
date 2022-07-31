// Default packages
import fs from 'fs'

// Installed packages
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'

async function writeBlobToFile(req) {
    // Validate that the blob sent is of type audio/* and everything is A-OK, 
    // the limits are respected and all before proceeding to write to file
    try {
        const blob = req?.file?.buffer?.buffer

        if (!blob) {
            return [405, 'Pensieve file buffer not present']
        }

        const fileType = await fileTypeFromBuffer(blob)
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