const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const {check} = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware")

//register
router.post(
    "/register",
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Min length for password 6 symbols").isLength({min: 6})
    ],
    userController.registration
)

//login
router.post(
    "/login",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Invalid password").exists()
    ],
    userController.login
)

//check
router.get("/check", authMiddleware, userController.check)

//logout
router.delete("/logout", userController.logout)

//log time
router.put("/:id", userController.logTime)

//get users
router.get("/all", userController.getUsers)

//get authorized user data
router.get("/", authMiddleware, userController.getAuthorizedUserData)

module.exports = router