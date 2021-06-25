const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
router.get("/", usersController.get_user_list);

router.get("/:userId", usersController.get_user);

router.delete("/:userId", usersController.delete_user);
module.exports = router;
