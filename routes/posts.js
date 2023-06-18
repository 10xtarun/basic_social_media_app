const router = require("express").Router();
const multer = require("multer");
const Post = require("../models/posts");

const FirebaseAdmin = require("../utils/firebase");

// setup object storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

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
    (req, res) => {
      const { body } = req;
      const bucket = FirebaseAdmin.storage().bucket();

      Promise.resolve()
        .then(() => {
          const { file } = req;

          const blob = bucket.file(file.originalname);

          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: file.mimetype,
            },
          });

          blobWriter.on("error", (err) => { throw err; });

          blobWriter.on("finish", () => {

          });

          blobWriter.end(file.buffer);

          return blob.getSignedUrl({ action: "read", expires: "12-31-2099" });
        })
        .then((signeURL) => {
          // eslint-disable-next-line prefer-destructuring
          body.image_url = signeURL[0];

          return Post.create(body);
        })
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
