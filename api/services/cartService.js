require("dotenv").config();
const cartDao = require("../models/cartDao");

const getCart = async (userId) => {
  const cartList = await cartDao.getCart(userId);
  return await cartList;
};

module.exports = {
  getCart,
};