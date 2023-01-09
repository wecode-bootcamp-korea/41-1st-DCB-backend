const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");
const { plusQuantity } = require("../models/cartDao");

router.get("", validateToken, cartController.getCart);
router.post("", validateToken, cartController.addCart);
router.post("/plus/:cartId", validateToken, cartController.plusQuantity);
router.post("/minus/:cartId", validateToken, cartController.minusQuantity);
router.delete("/:cartId", validateToken, cartController.deleteCart);

module.exports = {
  router
};
