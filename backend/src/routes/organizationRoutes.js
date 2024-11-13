const { Router } = require("express")

const router = Router()

const organizationController = require("../controllers/organizationController")

const { isOwner } = require("../middlewares/organizationMiddleware")

router.post("/create", organizationController.create)
router.get("/all", organizationController.getAll)
router.get("/:oid", organizationController.get)
router.delete("/:oid", isOwner, organizationController.remove)

router.post("/:oid/addSport/:sid", isOwner, organizationController.addSport)
router.delete("/:oid/removeSport/:sid", isOwner, organizationController.removeSport)

router.post("/:oid/addPlayer/:pid", isOwner, organizationController.addPlayer)
router.delete("/:oid/removePlayer/:pid", isOwner, organizationController.removePlayer)

module.exports = router