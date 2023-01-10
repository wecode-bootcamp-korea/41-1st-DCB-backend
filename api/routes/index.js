const express = require("express");
const router = express.Router();

const itemsRoutes = require('./itemsRoutes');
const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");
const payRouter = require("./payRoutes");

router.use('/items', itemsRoutes.router);
router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);
router.use("/pay", payRouter.router);

module.exports = router;