const router = require("express").Router()
const mongoose = require("mongoose")

router.route("/")
    // Get all posts
    .get((req, res) => {
        return mongoose.connection.db.collection("post")
            .find().toArray()
            .then(data =>
                res
                    .status(200)
                    .json({
                        message: "Posts fetched successfully.",
                        data: data
                    })
            )
            .catch((error) =>
                res
                    .status(422)
                    .json({
                        message: "Posts fetch failed.",
                        data: {},
                        error: error.message ? error.message : error.toString()
                    })
            )

    })
    // Create a posts
    .post((req, res) => {
        const body = req.body
        console.log("body: ", body)

        return mongoose.connection.db.collection("post")
            .insertOne({ ...body })
            .then((doc) =>
                res
                    .status(201)
                    .json({
                        message: "Post created successfully.",
                        data: doc
                    })
            )
            .catch((error) =>
                res
                    .status(422)
                    .json({
                        message: "Post creation failed.",
                        data: {},
                        error: error.message ? error.message : error.toString()
                    })
            )
    })


router.route("/:uid")
    // Get single post
    .get((req, res) => {
        const uid = req.params.uid
        console.log("params: uid ", uid)

        res
            .status(200)
            .json({
                message: "Post fetched successfully.",
                data: {}
            })
    })
    // Update a post
    .put((req, res) => {
        const uid = req.params.uid
        const body = req.body

        console.log("params: uid ", uid)
        console.log("body: ", body)

        res
            .status(201)
            .json({
                message: "Post updated successfully.",
                data: body
            })
    })
    // Delete a post
    .delete((req, res) => {
        const uid = req.params.uid
        console.log("params: uid ", uid)

        res
            .status(200)
            .json({
                message: "Post deleted successfully.",
                data: {}
            })
    })



module.exports = router