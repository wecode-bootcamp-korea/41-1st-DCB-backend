const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getCart = asyncErrorHandler(async (req, res) => {
  const cartList = await cartService.getCart(req.userId);
  return res.status(200).json({ data: cartList });
});

const addCart = asyncErrorHandler(async (req, res) => {
  const added = await cartService.addCart(req.userId, req.query.itemId, req.query.optionId);
  return res.status(201).json({ data: added });
});

const plusQuantity = asyncErrorHandler(async (req, res) => {
  const result = await cartService.plusQuantity(req.userId, req.params.cartId);
  return res.status(201).json({ data: result });
})

const minusQuantity = asyncErrorHandler(async (req, res) => {
  const result = await cartService.minusQuantity(req.userId, req.params.cartId)
  return res.status(201).json({ data: result });
})

const deleteCart = asyncErrorHandler(async (req, res) => {
  await cartService.deleteCart(req.params.cartId);
  return res.status(200).json({ message: "delete complete" });
});

module.exports = {
  getCart,
  addCart,
  plusQuantity,
  minusQuantity,
  deleteCart
}