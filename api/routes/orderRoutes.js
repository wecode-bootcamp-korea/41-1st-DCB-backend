const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const validateToken = require("../middleware/auth");

router.post("", validateToken, orderController.createOrder);
router.get("", validateToken, orderController.getOrderStatus);

module.exports = {
  router,
};
