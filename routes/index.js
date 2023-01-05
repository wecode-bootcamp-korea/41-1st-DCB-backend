const express = require("express");
const router = express.Router();

const signUpRouter = require("./signUpRouter");

router.use("/signup", signUpRouter.router);

module.exports = router;
