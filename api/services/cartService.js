require("dotenv").config();

const cartDao = require("../models/cartDao");


// 카트 조회 > GET /cart
const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

// 카트 선택삭제 > DELETE /cart
const deleteCart = async (cartId, userId) => {
  return await cartDao.deleteCart(cartId, userId);
};

// 장바구니 수량변경 > PATCH /cart
const updateCart = async (quantity, itemsId, userId) => {
  return await cartDao.updateCart(quantity, itemsId, userId);
};

module.exports = {
  getCart,
  deleteCart,
  updateCart,
};