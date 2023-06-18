const mongoose = require("mongoose");
const { randomSecureKey } = require("../utils");

const postSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      // required: true,
      // unique: true,
      default: randomSecureKey(),
    },
    caption: {
      type: String,
    },
    image_url: {
      type: String,
      // required: true,
    },
    user_id: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("post", postSchema);
