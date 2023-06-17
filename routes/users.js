const router = require("express").Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const ApiError = require("../utils/ApirError");

router.route("/auth/register")
  .post(
    body("user.password").isLength({ min: 8, max: 12 }),
    (req, res, next) => {
      const { user } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const { msg, path } = errors.array()[0];
        return next(new ApiError(400, "User registeration failed.", `${path}: ${msg}`));
      }

      return User.create(user)
        .then((doc) => res
          .status(201)
          .json({
            message: "User registered successfully.",
            data: doc,
            error: null,
          }))
        .catch((error) => next(new ApiError(400, "User registeration failed.", error.toString())));
    },
  );

router.post(
  "/auth/login",
  body("user.email").notEmpty().isEmail(),
  body("user.password").notEmpty(),
  (req, res, next) => {
    const { user } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { msg, path } = errors.array()[0];
      return next(new ApiError(400, "User login failed.", `${path}: ${msg}`));
    }

    return User.findOne({ email: user.email })
      .then((doc) => {
        if (!doc) {
          return next(new ApiError(404, "User login failed.", "User not found."));
        }

        return bcrypt.compare(user.password, doc.password);
      })
      .then((compared) => {
        if (!compared) {
          return next(new ApiError(400, "User login failed.", "Invalid login credentials."));
        }
        return res.status(200).json({
          message: "User login successful.",
          data: {},
          error: null,
        });
      })
      .catch((error) => next(new ApiError(400, "User login failed.", error.toString())));
  },
);

router.route("/:uid")
  .get((req, res) => User.findOne({ uid: req.params.uid })
    .then((doc) => {
      if (!doc) {
        throw Error("User not found.");
      }
      return res
        .status(200)
        .json({
          message: "User fetched successfully.",
          data: doc,
          error: null,
        });
    })
    .catch((error) => res
      .status(422)
      .json({
        message: "User fetch failed.",
        data: {},
        error: error.toString(),
      })))
  .put((req, res, next) => {
    const { user } = req.body;

    User.findOneAndUpdate({ uid: req.params.uid }, { ...user }, { new: true })
      .then((doc) => {
        if (!doc) {
          return next(new ApiError(404, "User updation failed.", "User not found."));
        }
        return res
          .status(200)
          .json({
            message: "User updated successfully.",
            data: doc,
            error: null,
          });
      })
      .catch((error) => {
        next(new ApiError(400, "User updation failed.", error.toString()));
      });
  })
  .delete((req, res) => {
    User.deleteOne({ uid: req.params.uid })
      .then((doc) => {
        if (doc.deletedCount === 0) {
          throw Error("User not found.");
        }

        return res
          .status(200)
          .json({
            message: "User deleted successfully.",
            data: {},
            error: null,
          });
      })
      .catch((error) => res
        .status(422)
        .json({
          message: "User deletion failed.",
          data: {},
          error: error.toString(),
        }));
  });

module.exports = router;
