const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// 카트 조회
router.get("/cart", cartController.getCart);

// 결제로 토스
router.post("/cart", cartController.payCart);

// 장바구니 추가
router.post("/add", cartController.addCart);

// 장바구니 수량변경 > PATCH /cart
router.patch("/quantity", cartController.updateQuantityCart);

// 카트 선택삭제 > DELETE /cart
router.delete("/cart", cartController.deleteCart);

// 카트 전체삭제
router.delete("/all", cartController.deleteAllCart);

// 모듈화
module.exports = {
  router
};