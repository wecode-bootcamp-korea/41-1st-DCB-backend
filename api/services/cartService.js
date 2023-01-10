require("dotenv").config();
const cartDao = require("../models/cartDao");

const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};

const addCart = async (userId, itemId, optionId) => {
  const cart = await cartDao.addCart(userId, itemId, optionId);
  return cart;
};

const updateQuantity = async (quantity, itemId, userId) => {
  const result = await cartDao.updateQuantity(quantity, itemId, userId);
  return await result;
};

const deleteCart = async (itemId, userId) => {
  return await cartDao.deleteCart(itemId, userId);
};

module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart
};