const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    return res.status(200)
    .json({
        message: "Posts fetched successfully.",
        data: [],
        error: null,
    })
})

router.post("/", (req, res) => {
    const body = req.body
    console.log(" post body: ", body)

    return res.status(201)
    .json({
        message: "Post created successfully.",
        data: {},
        error: null,
    })
})

router.put("/:uid", (req, res) => {
    const uid = req.params.uid
    const body = req.body

    console.log(" put uid: ", uid)
    console.log(" put body: ", body)
    
    return res.status(200)
    .json({
        message: "Post updated successfully.",
        data: {},
        error: null,
    })
})

module.exports = router