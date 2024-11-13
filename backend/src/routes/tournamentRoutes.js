const { Router } = require("express")

const router = Router()

const tournamentController = require("../controllers/tournamentController")

const { isOwner } = require("../middlewares/tournamentMiddleware")
const { isOwner : organizationIsOwner } = require("../middlewares/organizationMiddleware")

router.post("/create/:oid", organizationIsOwner, tournamentController.create)
router.get("/all", tournamentController.getAll)
router.get("/:tid", tournamentController.get)
router.delete("/:tid", isOwner, tournamentController.remove)

router.post("/:tid/addOrg/:oid", tournamentController.addOrg)
router.delete("/:tid/removeOrg/:oid", tournamentController.removeOrg)
router.get("/random/:id",tournamentController.random) 

module.exports = router