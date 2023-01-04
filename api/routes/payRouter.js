const express = require("express");
const router = express.Router();
const payController = require("../controllers/payController");


// 결제
router.post("/pay", payController.pay);

// 모듈화
module.exports = {
  router
};