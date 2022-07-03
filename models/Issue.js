const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    subject: {type: String, required: true},
    description: {type: String},
    items: [],
    startDate: String,
    board: {type: String, required: true},
    project: {type: {}, required: true},
    priority: {type: String, required: true},
    updated: String,
    estimatedTime: String,
    spentTime: String,
    assignee: {}
})

module.exports = model("Issues", schema)