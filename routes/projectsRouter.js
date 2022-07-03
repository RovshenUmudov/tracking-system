const Router = require("express")
const router = new Router()
const projectController = require("../controllers/projectsController")

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getSingleProject)
router.delete('/:id', projectController.removeProject)

router.post('/create', projectController.createProject)
router.put('/:id', projectController.updateProject)

module.exports = router