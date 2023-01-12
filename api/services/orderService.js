require("dotenv").config();
const orderDao = require("../models/orderDao");

const createOrder = async (userId, cartId, totalPrice, paymentMethod) => {
  const userPoints = await orderDao.userPoints(userId);
  if (userPoints.point < totalPrice) {
    const err = new Error("You don't have enough money");
    err.statusCode = 400;
    throw err;
  }
  const result = await orderDao.createOrder(
    userId,
    cartId,
    totalPrice,
    paymentMethod
  );
  return result;
};

const getOrderStatus = async (userId) => {
  const result = await orderDao.getOrderStatus(userId);
  return result;
};

module.exports = {
  createOrder,
  getOrderStatus,
};
