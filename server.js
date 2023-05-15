const express = require("express")
const mongodb = require("mongodb")
const routes = require("./routes")
const constants = require("./local-constants")

// initialize express app
const app = express()

// connect to the database
const dbClient = new mongodb.MongoClient(constants.mongoURL)

dbClient.connect()
.then((client) => {
    const db = client.db("sm_app")

    console.log("Database connection established and connected to db: ", db.databaseName)
})
.catch((error) => {
    console.log("Database connection failed due to error: ", error)
    process.exit(0)
})



// test/greetings API at root level
app.get("/", (req, res) => {
    res.send("Greetings from your social media app server.")
})

// include other Routes
app.use("/posts", routes.postRouter)

// server's port
app.listen(8000, (error) => {
    if (error)
        // if server is not starting then log the error
        console.log("Server unable to start: ", error)

    console.log("Server is running on port 8000.")
})