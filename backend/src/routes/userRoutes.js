const { Router } = require("express");

const router = Router();

const UserController = require("../controllers/UserController");

router.get("/:id", UserController.list);            // Get logged user info
router.post("/create", UserController.store);       // Create a new user
router.post("/login", UserController.login);        // Login user [verify credentials]
router.put("/edit", UserController.edit);           // Edit an user info
router.delete("/remove", UserController.remove);    // Remove user from db

module.exports = router;