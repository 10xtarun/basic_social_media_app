const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/index")
const constants = require("./local-constants")

// initialize the express app
const app = express()

// database connection setup
mongoose.connect(constants.mongo_uri, {})
.then((client) => {
    console.log("Database connection established and database name is : ", client.connection.db.databaseName)
})
.catch((error) => {
    console.log("Database connection failed and error is : ", error)
})

// add middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// basic API route
app.get("/", (req, res) => {
    return res.send("Greetings from social media app server.")
})

// add all the routes here
app.use("/posts", router.postRouter)

// run the server on port number
app.listen(8000, (error) => {
    if(error) {
        console.log("Server unable to start, due to error: ", error)
    }
    console.log("Server is running on port number 8000.")
})