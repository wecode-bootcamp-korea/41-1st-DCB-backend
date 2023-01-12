const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");

router.get("", validateToken, cartController.getCart);
router.post("", validateToken, cartController.addCart);
router.patch("", validateToken, cartController.updateQuantity);
router.delete("", validateToken, cartController.deleteCart);

module.exports = {
  router
};
