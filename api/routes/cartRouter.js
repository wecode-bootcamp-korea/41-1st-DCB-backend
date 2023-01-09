const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");
const { plusQuantity } = require("../models/cartDao");

router.get("", validateToken, cartController.getCart);
router.post("", validateToken, cartController.addCart);

module.exports = {
  router
};
