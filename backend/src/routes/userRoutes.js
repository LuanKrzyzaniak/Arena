const { Router } = require("express");

const router = Router();

const UserController = require("../controllers/UserController");

router.get("/:id", UserController.get);             // Get logged user info
router.post("/create", UserController.create);      // Create a new user
router.post("/login", UserController.login);        // Login user [verify credentials]
router.put("/edit", UserController.edit);           // Edit an user info
router.delete("/remove", UserController.remove);    // Remove user from db
router.post("/verify",UserController.verify);       // Verify if user is logged
module.exports = router;