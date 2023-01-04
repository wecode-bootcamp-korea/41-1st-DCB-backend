const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// 카트 조회
router.get("/getCart", cartController.getCart);

// 카트 선택삭제 > DELETE /cart
router.delete("/deleteCart", cartController.deleteCart);


// 장바구니 수량변경 > PATCH /cart
router.patch("/patchCart", cartController.patch);

// 모듈화
module.exports = {
  router
};