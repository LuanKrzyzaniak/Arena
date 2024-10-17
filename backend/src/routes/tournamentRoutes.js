const { Router } = require("express");
const {checkVerified} = require("../middlewares/middlewares")
const router = Router();

const TournamentController = require("../controllers/TournamentController");


router.get("/",TournamentController.getAllTournament);//Get all tournaments for cards
router.get("/name",TournamentController.getTournamentByName);
router.get("/id", TournamentController.getTournamentById);  //Get 1 tournament by id
router.post("/create",checkVerified,TournamentController.create); //Create a tournament
router.delete("/remove",TournamentController.deleteByName); // Delete a tournament by name
router.get("/formats",TournamentController.getFormats);
module.exports = router;
