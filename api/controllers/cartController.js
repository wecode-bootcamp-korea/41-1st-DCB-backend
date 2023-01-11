const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getCart = asyncErrorHandler(async (req, res) => {
  const cartList = await cartService.getCart(req.userId);

  return res.status(200).json({ data: cartList });
});

const addCart = asyncErrorHandler(async (req, res) => {
  const addedCart = await cartService.addCart(req.userId, req.body.itemId, req.body.optionId, req.body.quantity);
  console.log(req)
  return res.status(201).json({ data: addedCart });
});

const updateQuantity = asyncErrorHandler(async (req, res) => {
  const result = await cartService.updateQuantity(req.body.quantity, req.body.itemId, req.userId)
  return res.status(201).json({ data: result });
})

const deleteCart = asyncErrorHandler(async (req, res) => {
  await cartService.deleteCart(req.query.itemId, req.userId);
  return res.status(200).json({ message: "delete complete" });
});

module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart
}