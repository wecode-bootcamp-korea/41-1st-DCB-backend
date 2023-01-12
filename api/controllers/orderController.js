const orderService = require("../services/orderService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const order = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { cartId } = request.query;
  const { totalPrice, paymentMethod } = request.body;
  await orderService.order(userId, cartId, totalPrice, paymentMethod);
  return response.status(200).send("orderSuccess");
});

const loadOrderStatus = asyncErrorHandler(async (req, res) => {
  const { oiOrderId } = req.body;
  const userId = req.userId;
  if (!userId || !oiOrderId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  };
  const orderStatus = await orderService.loadOrderStatus(userId, oiOrderId);
  return res.status(200).json({ data: orderStatus });
});

module.exports = {
  order,
  loadOrderStatus
};