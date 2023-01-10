const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getCart = asyncErrorHandler(async (req, res) => {
  const cartList = await cartService.getCart(req.userId, req.query.userId);
  return res.status(200).json({ data: cartList });
});

module.exports = {
  getCart,
}