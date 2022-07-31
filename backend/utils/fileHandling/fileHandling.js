// Default packages
import fs from 'fs'

// Installed packages
import fetch from 'node-fetch'

async function writeBlobToFile(blob) {
    // Validate that the blob sent is of type audio/* and everything is A-OK, 
    // the limits are respected and all before proceeding to write to file
    const blobBuffer = Buffer.from(blob)

    fs.writeFile('penseive.mp4', blobBuffer, err => {
        if (err) {
            throw new Error('Something went wrong with extracting penseive...')
        }
    })
}

export {
    writeBlobToFile
}