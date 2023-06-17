const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { randomSecureKey } = require("../utils")
const { saltRounds } = require("../local-constants")

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

schema.pre("save", function(){
    return bcrypt.hash(this.password, saltRounds)
    .then(hash => {
        this.password = hash
    })
})

const usersModel = mongoose.model("user", schema)
module.exports = usersModel

