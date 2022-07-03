const Router = require("express")
const router = new Router()
const userRouter = require("./userRouter")
const projectsRouter = require("./projectsRouter")
const issuesRouter = require("./issuesRouter")

router.use("/user", userRouter)
router.use("/projects", projectsRouter)
router.use("/issues", issuesRouter)

module.exports = router