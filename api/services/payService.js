require("dotenv").config();
const payDao = require("../models/payDao");


const addOrder = async (userId, itemId, optionId, quantity, points) => {
  const orderId = await payDao.addOrder(userId, itemId, optionId, quantity, points);
  return await orderId;
};

module.exports = {
  addOrder
};