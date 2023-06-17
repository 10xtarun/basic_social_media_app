const mongoose = require("mongoose")
const { randomSecureKey } = require("../utils")

const schema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        default: randomSecureKey()
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    created_at: Date,
    updated_at: Date
})

// schema.index(
//     { email: 1, username: 1 },
//     { unique: true, background: true }
// )

const usersModel = mongoose.model("user", schema)
module.exports = usersModel

