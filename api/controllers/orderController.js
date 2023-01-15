const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const createOrder = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { cartId, totalPrice, paymentMethod } = request.body;
  await orderService.createOrder(userId, cartId, totalPrice, paymentMethod);
  return response.status(201).send("orderSuccess");
});

const getOrderStatus = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    const err = new Error("GETTING ORDER STATUS ERROR");
    err.statusCode = 400;
    throw err;
  }
  const orderStatus = await orderService.getOrderStatus(userId);
  return res.status(200).json({ data: orderStatus });
});

module.exports = {
  createOrder,
  getOrderStatus,
};
