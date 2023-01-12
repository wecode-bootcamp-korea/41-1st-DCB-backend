require("dotenv").config();
const payDao = require("../models/payDao");

const addOrder = async (userId, itemId, optionId, quantity, points, totalPrice) => {
  const result = await payDao.addOrder(userId, itemId, optionId, quantity, points, totalPrice);
  return await result;
};

const loadOrderStatus = async (userId, oiOrderId) => {
  const result = await payDao.loadOrderStatus(userId, oiOrderId);
  return result;
}

module.exports = {
  addOrder,
  loadOrderStatus
};