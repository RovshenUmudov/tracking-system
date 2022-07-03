const Projects = require("../models/Projects")
const Issue = require("../models/Issue")
const {Types} = require("mongoose");

const boards = [
    {
        id: "Backlog",
        title: "Backlog",
    },
    {
        id: "To do",
        title: "To do",
    },
    {
        id: "Analysis",
        title: "Analysis",
    },
    {
        id: "In progress",
        title: "In progress",
    },
    {
        id: "Reopened",
        title: "Reopened",
    },
    {
        id: "To test",
        title: "To test",
    },
    {
        id: "QA in progress",
        title: "QA in progress",
    },
    {
        id: "Done",
        title: "Done",
    }
]

const ProjectsController = {

    //return all projects
    getAllProjects: async (req, res) => {
        try {
            const projects = await Projects.find({}, {title: 1, tags: 1})

            if (!projects.length > 0) {
                res.status(500).json({resultCode: 1, message: "No Projects!"})
            }

            return res.json({resultCode: 0, projects: projects})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //return project by id
    getSingleProject: async (req, res) => {
        try {
            const {id} = req.params
            const project = await Projects.findOne({_id: id})

            const issues = await Issue.find({"project._id": Types.ObjectId(id)})

            if (!project) {
                res.status(500).json({resultCode: 1, message: `Can't find project by ID: ${id}`})
            }

            return res.json({resultCode: 0, project, issues})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //create new project
    createProject: async (req, res) => {
        try {
            if (!req.body) {
                res.status(500).json({resultCode: 1, message: "No data"})
            }

            const {project, tags} = req.body
            const newProject = new Projects({title: project, tags: tags, boards: boards})
            await newProject.save()

            return res.json({resultCode: 0, message: "Project was created successfully"})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //update project
    updateProject: async (req, res) => {
        try {
            const {id} = req.params
            const {data} = req.body

            if (!id || !data) {
                res.status(500).json({resultCode: 1, message: "No data"})
            }

            await Projects.updateOne({_id: id}, {
                $set: {
                    title: data.project,
                    tags: data.tags
                }
            })
            const project = await Projects.findOne({_id: id})

            return res.json({resultCode: 0, project, message: "Project was update"})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    },

    //remove project
    removeProject: async (req, res) => {
        try {
            const {id} = req.params
            await Projects.deleteOne({_id: id})
            await Issue.deleteOne({projectId: id})

            res.json({resultCode: 0, message: `Project with id: ${id} was removed`})

        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong"})
        }
    }
}

module.exports = ProjectsController