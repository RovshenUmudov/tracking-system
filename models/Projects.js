const {Schema, model} = require("mongoose")

const schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    tags: [],
    boards: [],
})

module.exports = model("Projects", schema)
