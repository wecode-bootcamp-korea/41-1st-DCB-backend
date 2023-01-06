require("dotenv").config();
const cartDao = require("../models/cartDao");


const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};

// 카트 추가
const addCart = async (itemId, optionId) => {
  const added = await cartDao.addCart(itemId, optionId);
  return await added;
};

// // 장바구니 수량변경 > PATCH /cart
// const updateCart = async (quantity, itemsId, userId) => {
//   return await cartDao.updateCart(quantity, itemsId, userId);
// };

// // 카트 선택삭제 > DELETE /cart
// const deleteCart = async (cartId, userId) => {
//   return await cartDao.deleteCart(cartId, userId);
// };



module.exports = {
  getCart,
  addCart,
  // updateCart,
  // deleteCart,
  // deleteAllCart
};