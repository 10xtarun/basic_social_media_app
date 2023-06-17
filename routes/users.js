const router = require("express").Router()
const User = require("../models/users")
const { randomSecureKey } = require("../utils")

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

module.exports = router
