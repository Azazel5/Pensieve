// Default packages
const fs = require('fs')

// Installed packages
const fetch = require('node-fetch')

async function convertBlobUrlToFile(blobUrl) {
    // const response = await fetch(blobUrl)
    // const responseBlob = await response.blob()
    // const blobArrayBuffer = await responseBlob.arrayBuffer()

    fs.writeFile('penseive.mp4', Buffer.from(blobUrl), err => {
        if (err) {
            return false
        }
    })

    return true
}

module.exports = {
    convertBlobUrlToFile
}