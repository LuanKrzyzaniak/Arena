const { Router } = require("express");

const router = Router();

const TournamentController = require("../controllers/TournamentController");


router.get("/",TournamentController.getAllTournament);//Get all tournaments for cards
router.get("/name",TournamentController.getTournamentByName);
router.get("/id", TournamentController.getTournamentById);  //Get 1 tournament by id
router.post("/create",TournamentController.create); //Create a tournament
router.delete("/remove",TournamentController.deleteByName); // Delete a tournament by name
module.exports = router;
