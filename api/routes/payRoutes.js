const express = require("express");
const router = express.Router();
const payController = require("../controllers/payController");
const validateToken = require("../middleware/auth");

router.post("", validateToken, payController.addOrder);
router.get("", validateToken, payController.loadPayStatus);

module.exports = {
  router
};