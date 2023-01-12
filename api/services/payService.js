require("dotenv").config();
const payDao = require("../models/payDao");


const addOrder = async (userId, itemId, optionId, quantity, points, totalPrice) => {
  const result = await payDao.addOrder(userId, itemId, optionId, quantity, points, totalPrice);
  return await result;
};

const loadPayStatus = async (userId, osId) => {
  const result = await payDao.loadPayStatus(userId, osId);
  return result;
}

module.exports = {
  addOrder,
  loadPayStatus
};