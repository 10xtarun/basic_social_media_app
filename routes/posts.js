const express = require("express")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/", (req, res) => {

    mongoose.connection.db.collection("posts")
        .find()
        .toArray()
        .then((documents) => {
            return res.status(200)
                .json({
                    message: "Posts fetched successfully.",
                    data: documents,
                    error: null,
                })
        })
})

router.post("/", (req, res) => {
    const body = req.body
    console.log(" post body: ", body)

    mongoose.connection.db.collection("posts")
        .insertOne(body)
        .then((document) => {
            return res.status(201)
                .json({
                    message: "Post created successfully.",
                    data: document,
                    error: null,
                })
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