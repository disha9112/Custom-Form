const express = require("express");
const router = express.Router();
const { signUp } = require("../../controllers/auth/signUp");
const { logIn } = require("../../controllers/auth/logIn");

router.post("/signUp", signUp);
router.post("/logIn", logIn);

module.exports = router;
