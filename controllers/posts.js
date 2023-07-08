const Post = require("../models/posts");

const getAllPosts = (req, res) => Post.find({})
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
    }));

module.exports = {
  getAllPosts,
};
