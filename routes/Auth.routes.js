const express = require("express");
const router = express.Router();

//! controllers importing
const { register, login } = require("../controllers/Auth.controller");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
