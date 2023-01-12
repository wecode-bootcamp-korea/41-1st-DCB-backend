require("dotenv").config();
const cartDao = require("../models/cartDao");

const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};

const addCart = async (userId, itemId, optionId, quantity) => {
  const cart = await cartDao.addCart(userId, itemId, optionId, quantity);
  return cart;
};

const updateQuantity = async (userId, cartId, quantity) => {
  const result = await cartDao.updateQuantity(userId, cartId, quantity);
  return await result;
};

const deleteCart = async (cartId, userId) => {
  return await cartDao.deleteCart(cartId, userId);
};

module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart
};