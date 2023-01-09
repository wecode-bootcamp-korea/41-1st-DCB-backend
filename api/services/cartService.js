require("dotenv").config();
const cartDao = require("../models/cartDao");

const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};

const addCart = async (userId, itemId, optionId) => {
  const added = await cartDao.addCart(userId, itemId, optionId);
  return added;
};

const plusQuantity = async (cartId, userId) => {
  const result = await cartDao.plusQuantity(userId, cartId);
  return await result;
};

const minusQuantity = async (cartId, userId) => {
  const result = await cartDao.minusQuantity(userId, cartId);
  return await result;
};

const deleteCart = async (cartId) => {
  return await cartDao.deleteCart(cartId);
};

module.exports = {
  getCart,
  addCart,
  plusQuantity,
  minusQuantity,
  deleteCart
};