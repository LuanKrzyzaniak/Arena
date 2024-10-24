const { Router } = require("express");
const {checkVerified} = require("../middlewares/middlewares")
const router = Router();

const TournamentController = require("../controllers/TournamentController");


router.get("/",TournamentController.getAllTournament);//Get all tournaments for cards
router.get("/name",TournamentController.getTournamentByName);
router.get("/id", TournamentController.getTournamentById);  //Get 1 tournament by id
router.post("/create",checkVerified,TournamentController.create); //Create a tournament
router.delete("/remove",TournamentController.deleteByName); // Delete a tournament by name
router.get("/formats",TournamentController.getFormats); // Get all formats
router.get("/tournamentsports",TournamentController.getTournamentByName);//Get tournaments by sport
router.get("/sports",TournamentController.getSports);//Get all sports
module.exports = router;
