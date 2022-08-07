import { MongoClient } from 'mongodb'

let client

async function connect() {
    try {
        client = new MongoClient(process.env.MONGO_CONNECTION_URL)
        await client.connect()
    }

    catch (error) {
        console.error(error)
    }
}

async function close() {
    if (client) {
        await client.close()
    }
}

connect().catch(console.error)

export {
    client,
    close
}