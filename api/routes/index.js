const express = require("express");
const router = express.Router();

const itemsRoutes = require("./itemsRoutes");
const signUpRouter = require("./signUpRouter");
const signInRouter = require("./signInRouter");
const itemsFetchRouter = require("./itemsFetchRouter");

router.use("/items", itemsRoutes.router);
router.use("/signup", signUpRouter.router);
router.use("/signin", signInRouter.router);
router.use("/itemsFetch", itemsFetchRouter.router);

module.exports = router;
