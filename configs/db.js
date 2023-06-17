const mongoose = require("mongoose")
const { mongo_uri } = require("../local-constants")

module.exports = () => {
    mongoose.connect(mongo_uri)
    .then((client) => {
        const db = client.connection.db
        console.log("Database connection established and connected to db: ", db.databaseName)
    })
    .catch((error) => {
        console.log("Database connection failed due to error: ", error)
        process.exit(0)
    })
}