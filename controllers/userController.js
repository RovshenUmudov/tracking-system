const {validationResult} = require("express-validator");
const User = require("../models/User");
const Issues = require("../models/Issue");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {Types} = require("mongoose");
const moment = require("moment");

//generate jwt
const generateJwt = (id, email, secretKey, expiresIn) => {
    return jwt.sign({id, email}, secretKey, {expiresIn: expiresIn})
}

const UserController = {
    registration: async (req, res) => {
        try {
            //check if request not valid
            const errors = validationResult(req)

            //error response
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    errors: errors.array(),
                })
            }

            const {email, password} = req.body

            //find user in db
            const candidate = await User.findOne({email: email})

            if (candidate) {
                return res.status(400).json({resultCode: 1, message: "This email already registered"})
            }

            //hash password
            const hashedPassword = await bcrypt.hash(password, 12)
            //create user
            const user = new User({email, password: hashedPassword})
            //wait for save user in db
            await user.save()

            //generate token
            const token = await generateJwt(user.id, user.email, config.get("jwtSecret"), '24h')

            res.status(201).json({resultCode: 0, token})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    login: async (req, res) => {
        try {
            //check if request not valid
            const errors = validationResult(req)

            //error response
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    errors: errors.array(),
                })
            }

            const {email, password} = req.body

            //find user in db
            const user = await User.findOne({email: email})

            if (!user) {
                return res.status(400).json({resultCode: 1, message: "User is not found"})
            }

            //check if password is match
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({resultCode: 1, message: "Invalid password"})
            }

            //generate token
            const token = await generateJwt(user.id, user.email, config.get("jwtSecret"), '24h')

            //response token
            res.json({resultCode: 0, token})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    check: async (req, res) => {
        try {
            const token = generateJwt(req.user.id, req.user.email, config.get("jwtSecret"), '24h')

            res.json({
                resultCode: 0,
                token: token,
                id: req.user.id,
                email: req.user.email,
            })
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    logout: async (req, res) => {
        res.json({resultCode: 0, message: "logout"})
    },

    //log time
    logTime: async (req, res) => {
        try {
            const {id} = req.params
            const {issueID, payload} = req.body
            let spentTime = 0

            await User.updateOne({_id: id}, {
                $push: {
                    loggedTime: {
                        issueId: issueID, ...payload
                    }
                }
            })

            const users = await User.find({
                'loggedTime': {
                    $elemMatch: {
                        issueId: issueID
                    }
                }
            })

            users.map(el => {
                el.loggedTime.map(el => {
                    if (el.issueId.equals(issueID)) {
                        spentTime += el.hours
                    }
                })
            })

            await Issues.updateOne({_id: issueID}, {
                $set: {
                    spentTime: moment.utc(spentTime*3600*1000).format('HH:mm')
                }
            })

            res.json({
                resultCode: 0,
                message: `${payload.hours > 1 ? `${payload.hours} hours` : `${payload.hours} hour`} was logged in issues ${issueID}`
            })
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}, {_id:1, email: 1})
            res.json({resultCode: 0, users})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },
    //get authorized user data
    getAuthorizedUserData: async (req, res) => {
        try {
            const data = {}
            const assigneeIssues = await Issues.find({"assignee._id": Types.ObjectId(req.user.id)}, {_id: 1, subject: 1, project: 1, board: 1, priority: 1})

            if(!assigneeIssues) {
                res.json({resultCode: 1, message: `Issues assignee to user ${req.user.email} not found`})
            }

            data.assigneeIssues = assigneeIssues

            res.json({resultCode: 0, data})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    }
}

module.exports = UserController