const router = require("express").Router();
const Post = require("../models/posts");
const APIError = require("../utils/ApirError");
const upload = require("../middlewares/uploader");
const FirebaseAdmin = require("../utils/firebase");

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
  .post(
    upload,
    (req, res, next) => {
      const { body, file } = req;

      return Promise.resolve()
        .then(() => {
          const bucket = FirebaseAdmin.storage().bucket();

          const blob = bucket.file(file.originalname);

          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });

          blobWriter.on("error", (error) => { throw error; });

          blobWriter.on("finish", () => { });

          blobWriter.end(file.buffer);

          return blob.getSignedUrl({ action: "read", expires: "12-31-2099" });
        })
        .then((signedURL) => {
          // eslint-disable-next-line prefer-destructuring
          body.image_url = signedURL[0];

          return Post.create(body);
        })
        .then((doc) => res
          .status(201)
          .json({
            message: "Post created successfully.",
            data: doc,
          }))
        .catch((error) => next(new APIError(400, "Post creation failed.", error.toString())));
    },
  );

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
