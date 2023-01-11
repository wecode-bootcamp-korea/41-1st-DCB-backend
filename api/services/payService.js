require("dotenv").config();
const payDao = require("../models/payDao");


const addOrder = async (userId) => {
  const order = await payDao.addOrder(userId);
  return await order;
};

module.exports = {
  addOrder
};