const express = require("express");
const router = express.Router();

const itemsRoutes = require("./itemsRoutes");
const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");
const mainItemsRouter = require("./mainItemsRouter");

router.use("/items", itemsRoutes.router);
router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);
router.use("/main-items", mainItemsRouter.router);

module.exports = router;
