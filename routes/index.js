const express = require("express");
const router = express.Router();

const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");

router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);

module.exports = router;
