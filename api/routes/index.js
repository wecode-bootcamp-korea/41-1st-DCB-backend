const express = require("express");
const router = express.Router();

const itemsRoutes = require('./itemsRoutes');
const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");
const payRoutes = require("./payRoutes");

router.use('/items', itemsRoutes.router);
router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);
router.use("/pay", payRoutes.router);

module.exports = router;