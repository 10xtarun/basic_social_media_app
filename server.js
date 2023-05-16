const express = require("express")
const router = require("./routes/index")

// initialize the express app
const app = express()

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