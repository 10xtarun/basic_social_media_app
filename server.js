const express = require("express")
const routes = require("./routes")

// initialize express app
const app = express()

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