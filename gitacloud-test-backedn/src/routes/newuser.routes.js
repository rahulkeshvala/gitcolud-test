const express = require("express");
const { saveUser } = require("../controllers/newuser.controller");
const router = express.Router();

router.post("/register", saveUser);

module.exports = router;
