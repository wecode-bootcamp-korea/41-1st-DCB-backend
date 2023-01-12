const payService = require("../services/payService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const addOrder = asyncErrorHandler(async (req, res) => {
  const { itemId, optionId, quantity, points, totalPrice } = req.body;
  const userId = req.userId;
  if (!itemId || !quantity || !quantity || !points) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  };
  const orderList = await payService.getCart(userId, itemId, optionId, quantity, points, totalPrice);
  return res.status(200).json({ data: orderList });
});

const loadPayStatus = asyncErrorHandler(async (req, res) => {
  const { osId } = req.body;
  const userId = req.userId;
  if (!userId || !osId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  };
  const payStatus = await payService.loadPayStatus(userId, osId);
  return res.status(200).json({ data: payStatus });
});

module.exports = {
  addOrder,
  loadPayStatus
};