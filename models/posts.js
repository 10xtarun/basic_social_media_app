const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        uid: {
            type: String,
            unique: true
        },
        user_id: {
            type: String,
            required: true
        },
        caption: {
            type: String
        },
        image_url: {
            type: String, 
            required: true
        }
    },
    {
       timestamps: true 
    }
)

const postModel = mongoose.model("post", schema)
module.exports = postModel
