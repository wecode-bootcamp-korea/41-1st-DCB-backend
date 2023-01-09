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

module.exports = {
  getCart,
  addCart,
};