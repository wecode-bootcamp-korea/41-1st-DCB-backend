const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");


router.get("", validateToken, cartController.getCart);


router.post("/items", cartController.addCart);


router.delete("/carts", cartController.deleteCart);


module.exports = {
  router
};