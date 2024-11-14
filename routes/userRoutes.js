const express = require("express");
const { registerUser, userLogin, currentUser } = require("../controller/userController");
const tokenValidation = require("../middleware/validationTokenHandler");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",userLogin);

router.get("/current",tokenValidation,currentUser)

module.exports = router;