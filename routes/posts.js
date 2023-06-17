const router = require("express").Router();
const Post = require("../models/posts");

router.route("/")
// Get all posts
  .get((req, res) => Post.find({})
    .then((data) => res
      .status(200)
      .json({
        message: "Posts fetched successfully.",
        data,
      }))
    .catch((error) => res
      .status(422)
      .json({
        message: "Posts fetch failed.",
        data: {},
        error: error.message ? error.message : error.toString(),
      })))
// Create a posts
  .post((req, res) => {
    const { body } = req;

    return Post.create(body)
      .then((doc) => res
        .status(201)
        .json({
          message: "Post created successfully.",
          data: doc,
        }))
      .catch((error) => res
        .status(422)
        .json({
          message: "Post creation failed.",
          data: {},
          error: error.message ? error.message : error.toString(),
        }));
  });

router.route("/:uid")
// Get single post
  .get((req, res) => {
    const { uid } = req.params;
    return Post.findOne({ uid })
      .then((doc) => res
        .status(200)
        .json({
          message: "Post fetched successfully.",
          data: doc,
        }))
      .catch((error) => res
        .status(422)
        .json({
          message: "Post fetch failed.",
          data: {},
          error: error.message ? error.message : error.toString(),
        }));
  })
// Update a post
  .put((req, res) => {
    const { uid } = req.params;
    const { body } = req;

    return Post.findOneAndUpdate({ uid }, { $set: body }, { new: true })
      .then((doc) => res
        .status(201)
        .json({
          message: "Post updated successfully.",
          data: doc,
        }))
      .catch((error) => res
        .status(422)
        .json({
          message: "Post updation failed.",
          data: {},
          error: error.message ? error.message : error.toString(),
        }));
  })
// Delete a post
  .delete((req, res) => {
    const { uid } = req.params;

    return Post.findOneAndDelete({ uid })
      .then((doc) => res
        .status(200)
        .json({
          message: "Post deleted successfully.",
          data: doc,
        }))
      .catch((error) => res
        .status(422)
        .json({
          message: "Post deletion failed.",
          data: {},
          error: error.message ? error.message : error.toString(),
        }));
  });

module.exports = router;
