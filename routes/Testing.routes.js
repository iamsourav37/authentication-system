const express = require("express");
const router = express.Router();

const { protected } = require("../controllers/TestController");
const { verifyAcessToken } = require("../helpers/jwt_helper");

router.get("/protected", verifyAcessToken, protected);

module.exports = router;
