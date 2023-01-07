require("dotenv").config();
const cartDao = require("../models/cartDao");


const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};


const addCart = async (itemId, optionId) => {
  const added = await cartDao.addCart(itemId, optionId);
  return await added;
};

const deleteCart = async (cartId) => {
  return await cartDao.deleteCart(cartId);
};


module.exports = {
  getCart,
  addCart,
  deleteCart
};