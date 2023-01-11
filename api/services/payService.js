require("dotenv").config();
const payDao = require("../models/payDao");


const addOrder = async (userId, itemId, optionId, quantity, points) => {
  const order = await payDao.addOrder(userId, itemId, optionId, quantity, points);
  return await order;
};

module.exports = {
  addOrder
};