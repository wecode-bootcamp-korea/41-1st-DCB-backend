const express = require("express");
const router = express.Router();

const itemsRoutes = require("./itemsRoutes");
const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");
const orderRoutes = require("./orderRoutes");
const cartRouter = require("./cartRouter");

router.use("/items", itemsRoutes.router);
router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);
router.use("/order", orderRoutes.router);
router.use("/carts", cartRouter.router);

module.exports = router;
