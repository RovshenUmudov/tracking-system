const Issue = require("../models/Issue")
const User = require("../models/User")
const Projects = require("../models/Projects")
const moment = require("moment")
const {Types} = require("mongoose")

const issuesController = {

    //create issue
    createIssue: async (req, res) => {
        try {
            const {id, payload} = req.body

            let assigneeUser = null

            if (payload.assignee) {
                assigneeUser = await User.findOne({email: payload.assignee}, {_id: 1, email: 1})
            }

            const project = await Projects.findOne({_id: id}, {_id: 1, title: 1})

            const issue = new Issue({
                project: {...project},
                spentTime: '00:00',
                ...payload,
                assignee: assigneeUser
            })
            await issue.save()

            return res.json({resultCode: 0, message: "New task was added"})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //update issue
    updateIssue: async (req, res) => {
        try {

            const {payload} = req.body

            const {id} = req.params
            const now = moment()

            let assigneeUser = null

            if (payload.assignee) {
                assigneeUser = await User.findOne({email: payload.assignee}, {_id: 1, email: 1})
            }

            await Issue.updateOne(
                {_id: id},
                {
                    $set: {
                        ...payload,
                        assignee: assigneeUser,
                        updated: now.diff(payload.startDate, "days") > 0 ? moment().format('YYYY-MM-DD') : payload.startDate
                    }
                }
            )

            return res.json({resultCode: 0, message: `Issue ${id} was updated`})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //update issue item
    updateIssueItem: async (req, res) => {
        try {
            const {item} = req.body
            const {id} = req.params

            await Issue.updateOne(
                {_id: id, "items.message": item.message},
                {
                    $set: {
                        "items.$.completed": !item.completed
                    }
                }
            )

            res.json({resultCode: 0, message: `Issue item was updated`})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //move issue
    moveIssue: async (req, res) => {
        try {

            const {board} = req.body
            const {id} = req.params

            await Issue.updateOne(
                {_id: id},
                {$set: {board: board}}
            )

            return res.json({resultCode: 0, message: `Issue ${id} was moved to board ${board}`})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //get issue
    getIssue: async (req, res) => {
        try {
            const {id} = req.params

            const issue = await Issue.findOne({_id: id})
            return res.json({resultCode: 0, issue})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //get issues
    getIssues: async (req, res) => {
        try {
            const issues = await Issue.find({})
            return res.json({resultCode: 0, issues})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //remove
    removeIssue: async (req, res) => {
        try {
            const {id} = req.params
            await Issue.deleteOne({_id: id})
            return res.json({resultCode: 0, message: `Issue ${id} was removed`})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    }
}

module.exports = issuesController