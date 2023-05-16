const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true
        },
        caption: {
            type: String
        },
        image_url: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("post", postSchema)