const router = require("express").Router()
const User = require("../models/users")
const { randomSecureKey } = require("../utils")
const ApiError = require("../utils/ApirError")

router.route("/")
    .post((req, res) => {
        const { user } = req.body

        User.create(user)
            .then(doc => {
                return res
                    .status(201)
                    .json({
                        message: "User created successfully.",
                        data: doc,
                        error: null
                    })
            })
            .catch(error => {
                return res
                    .status(422)
                    .json({
                        message: "User creation failed.",
                        data: {},
                        error: error.toString()
                    })
            })
    })

router.route("/:uid")
    .get((req, res) => {

        User.findOne({ uid: req.params.uid })
            .then(doc => {
                if (!doc) {
                    throw Error("User not found.")
                }
                return res
                    .status(200)
                    .json({
                        message: "User fetched successfully.",
                        data: doc,
                        error: null
                    })
            })
            .catch(error => {
                return res
                    .status(422)
                    .json({
                        message: "User fetch failed.",
                        data: {},
                        error: error.toString()
                    })
            })
    })
    .put((req, res, next) => {
        const { user } = req.body

        User.findOneAndUpdate({ uid: req.params.uid }, { ...user }, { new: true })
            .then(doc => {
                if (!doc) {
                    return next(new ApiError(404, "User updation failed.", "User not found."))
                }
                return res
                    .status(200)
                    .json({
                        message: "User updated successfully.",
                        data: doc,
                        error: null
                    })
            })
            .catch(error => {
                next(new ApiError(400, "User updation failed.", error.toString()))
            })
    })
    .delete((req, res) => {
        User.deleteOne({ uid: req.params.uid })
            .then(doc => {
                console.log("------------- ", doc)
                if (doc.deletedCount === 0) {
                    throw Error("User not found.")
                }

                return res
                    .status(200)
                    .json({
                        message: "User deleted successfully.",
                        data: {},
                        error: null
                    })
            })
            .catch(error => {
                return res
                    .status(422)
                    .json({
                        message: "User deletion failed.",
                        data: {},
                        error: error.toString()
                    })
            })

    })

module.exports = router
