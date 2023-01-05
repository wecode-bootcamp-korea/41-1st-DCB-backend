require("dotenv").config();

const cartDao = require("../models/cartDao");


// 카트 조회 > GET /cart
const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

// 결제로 토스
const payCart = async

// 카트 추가
const addCart = async

// 장바구니 수량변경 > PATCH /cart
const updateCart = async (quantity, itemsId, userId) => {
  return await cartDao.updateCart(quantity, itemsId, userId);
};

// 카트 선택삭제 > DELETE /cart
const deleteCart = async (cartId, userId) => {
  return await cartDao.deleteCart(cartId, userId);
};



module.exports = {
  getCart,
  payCart,
  addCart,
  deleteCart,
  updateCart,
};