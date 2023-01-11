const payService = require("../services/payService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const addOrder = asyncErrorHandler(async (req, res) => {
  const orderList = await payService.getCart(req.userId, req.body.itemId, req.body.optionId, req.body.quantity, req.body.points);
  return res.status(200).json({ data: orderList });
});

module.exports = {
  addOrder
};