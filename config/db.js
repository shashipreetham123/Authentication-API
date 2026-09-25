const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

const dbname = process.env.DB_NAME

async function connectDB() {
    try {
        await client.connect()

        const db = client.db(dbname)

        return db

    } catch (error) {

        console.error(error)

        throw error
    }
}

module.exports = connectDB