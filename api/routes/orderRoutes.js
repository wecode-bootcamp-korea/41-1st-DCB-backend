const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const validateToken = require("../middleware/auth");

router.post("", validateToken, orderController.addOrder);
router.get("", validateToken, orderController.loadOrderStatus);

module.exports = {
  router
};