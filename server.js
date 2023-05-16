const express = require("express")

// initialize the express app
const app = express()

// basic API route
app.get("/", (req, res) => {
    return res.send("Greetings from social media app server.")
})

// run the server on port number
app.listen(8000, (error) => {
    if(error) {
        console.log("Server unable to start, due to error: ", error)
    }
    console.log("Server is running on port number 8000.")
})