const express = require("express");
const router = express.Router();
const cartRouter = require("./cartRouter");

router.use("/cart", cartRouter.router);


module.exports = router;