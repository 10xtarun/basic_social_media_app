const router = require("express").Router()
const mongoose = require("mongoose")
const Post = require("../models/posts")

router.route("/")
    // Get all posts
    .get((req, res) => {
        return Post.find({})
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

        return Post.create(body)
            .then((doc) => {
                return res
                    .status(201)
                    .json({
                        message: "Post created successfully.",
                        data: doc
                    })
            })
            .catch((error) => {
                return res
                    .status(422)
                    .json({
                        message: "Post creation failed.",
                        data: {},
                        error: error.message ? error.message : error.toString()
                    })
            })
    })


router.route("/:uid")
    // Get single post
    .get((req, res) => {
        const uid = req.params.uid
        return Post.findOne({ uid })
            .then((doc) => {
                return res
                    .status(200)
                    .json({
                        message: "Post fetched successfully.",
                        data: doc
                    })
            })
            .catch((error) => {
                return res
                    .status(422)
                    .json({
                        message: "Post fetch failed.",
                        data: {},
                        error: error.message ? error.message : error.toString()
                    })
            })
    })
    // Update a post
    .put((req, res) => {
        const uid = req.params.uid
        const body = req.body

        
        return Post.findOneAndUpdate({ uid }, { $set: body }, { new: true })
        .then((doc) => {
            return res
            .status(201)
            .json({
                message: "Post updated successfully.",
                data: doc
            })
        })
        .catch((error) => {
            return res
            .status(422)
            .json({
                message: "Post updation failed.",
                data: {},
                error: error.message ? error.message : error.toString()
            })
        })
    })
    // Delete a post
    .delete((req, res) => {
        const uid = req.params.uid
        console.log("params: uid ", uid)

        return Post.findOneAndDelete({ uid })
        .then((doc) => {
            return res
            .status(200)
            .json({
                message: "Post deleted successfully.",
                data: doc
            })
        })
        .catch((error) => {
            return res
            .status(422)
            .json({
                message: "Post deletion failed.",
                data: {},
                error: error.message ? error.message : error.toString()
            })
        })
        
    })



module.exports = router