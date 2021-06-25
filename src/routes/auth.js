const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const authController = require("../controllers/auth");
//POST LOGIN
router.post("/login", authController.login);

router.post("/sign-up", authController.sign_up);

module.exports = router;
