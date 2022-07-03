const Router = require("express")
const issuesController = require("../controllers/issuesController");
const router = new Router()

router.post('/', issuesController.createIssue)
router.put('/:id', issuesController.updateIssue)
router.get('/:id', issuesController.getIssue)
router.get('/', issuesController.getIssues)
router.put('/move/:id', issuesController.moveIssue)
router.put('/item/:id', issuesController.updateIssueItem)
router.delete('/:id', issuesController.removeIssue)

module.exports = router