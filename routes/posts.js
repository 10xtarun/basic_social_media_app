const express = require("express")
const mongoose = require("mongoose")
const postModel = require("../models/posts")

const router = express.Router()

router.get("/", (req, res) => {
    postModel.find()
    .then((documents) => {
        return res.status(200)
                .json({
                    message: "Posts fetched successfully.",
                    data: documents,
                    error: null,
                })
    })
    .catch((error) => {
        return res.status(422)
                    .json({
                        message: "Posts fetch failed.",
                        data: {},
                        error: error.message ? error.message : error.toString(),
                    })
    })
})

router.post("/", (req, res) => {
    const body = req.body
    console.log(" post body: ", body)

    postModel.create(body)
    .then((document) => {
        return res.status(201)
                    .json({
                        message: "Post created successfully.",
                        data: document,
                        error: null,
                    })
    })
    .catch((error) => {
        return res.status(422)
                    .json({
                        message: "Post creation failed.",
                        data: {},
                        error: error.message ? error.message : error.toString(),
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