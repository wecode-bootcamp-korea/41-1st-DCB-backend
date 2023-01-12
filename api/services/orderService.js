require("dotenv").config();
const orderDao = require("../models/orderDao");

const order = async (userId, cartId, totalPrice, paymentMethod) => {
  const userPoints = await orderDao.userPoints(userId);
  if (userPoints.point < totalPrice) {
    const err = new Error("You don't have enough money");
    err.statusCode = 400;
    throw err;
  }
  const result = await orderDao.order(
    userId,
    cartId,
    totalPrice,
    paymentMethod
  );
  return result;
};

const getOrder = async (userId) => {
  return await orderDao.getOrder(userId);
};

const loadOrderStatus = async (userId, oiOrderId) => {
  const result = await orderDao.loadOrderStatus(userId, oiOrderId);
  return result;
}

module.exports = {
  order,
  getOrder,
  loadOrderStatus
};