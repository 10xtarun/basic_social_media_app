const router = require("express").Router()

router.route("/")
.get((req, res) => {
    res
    .status(200)
    .json({
        message: "Posts fetched successfully.",
        data: []
    })
})
.post((req, res) => {
    const body = req.body
    console.log("body: ", body)

    res
    .status(201)
    .json({
        message: "Post created successfully.",
        data: body
    })
})


router.route("/:uid")
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