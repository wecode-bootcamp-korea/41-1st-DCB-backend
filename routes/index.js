const express = require("express");
const router = express.Router();

const signUpRouter = require("./signUpRouter");

router.use("/signUp", signUpRouter.router);

module.exports = router;
