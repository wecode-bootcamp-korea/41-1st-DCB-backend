const payService = require("../services/payService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const addOrder = asyncErrorHandler(async (req, res) => {
  const orderList = await payService.getCart(req.userId);

  return res.status(200).json({ data: orderList });
});

module.exports = {
  addOrder
};