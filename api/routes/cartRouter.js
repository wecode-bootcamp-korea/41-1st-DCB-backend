const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");

router.get("", validateToken, cartController.getCart);

router.post("", validateToken, cartController.addCart);

router.post("/plus/:cartId", validateToken, cartController.plusQuantity);

router.patch("/minus/:cartId", validateToken, cartController.minusQuantity);

router.delete("/:cartId", validateToken, cartController.deleteCart);

module.exports = {
  router
};