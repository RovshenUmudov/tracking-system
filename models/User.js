const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    loggedTime: [
        {
            issueId: {
                type: Types.ObjectId,
                required: true,
            },
            date: {
                type: String,
                required: true
            },
            hours: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = model("User", schema)