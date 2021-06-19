const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
router.get("/", usersController.get_user_list);

router.get("/:userId", usersController.get_user);

module.exports = router;
