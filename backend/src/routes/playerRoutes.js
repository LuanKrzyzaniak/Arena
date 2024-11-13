const { Router } = require("express")

const router = Router()

const userController = require("../controllers/playerController")
const userMiddleware = require("../middlewares/playerMiddleware")

router.post("/create", userController.create)
router.post("/login", userController.login)
router.get("/all", userMiddleware.isLogged, userController.getAll)      // this must appear first for correct routing
router.get("/:pid", userMiddleware.isLogged, userController.get)
router.get("/", userMiddleware.isLogged, userController.getOwn)
router.put("/", userMiddleware.isLogged, userController.edit)
router.delete("/", userMiddleware.isLogged, userController.remove)

module.exports = router