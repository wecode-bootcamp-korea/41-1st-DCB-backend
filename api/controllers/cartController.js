const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getCart = asyncErrorHandler(async (req, res) => {
  const cartList = await cartService.getCart(req.userId);
  return res.status(200).json({ data: cartList });
});

const addCart = asyncErrorHandler(async (req, res) => {
  const { itemId, optionId, quantity } = req.body
  const userId = req.userId

  if (!itemId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const addedCart = await cartService.addCart(userId, itemId, optionId, quantity);
  return res.status(201).json({ data: addedCart });
});

const updateQuantity = asyncErrorHandler(async (req, res) => {
  const { itemId, quantity } = req.body
  const userId = req.userId

  if (!itemId || !quantity) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  const result = await cartService.updateQuantity(userId, itemId, quantity);
  return res.status(200).json({ data: result });
})

const deleteCart = asyncErrorHandler(async (req, res) => {
  const userId = req.userId
  const { itemId } = req.query
  if (!itemId) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }
  await cartService.deleteCart(itemId, userId);
  return res.status(200).json({ message: "delete complete" });
});

module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart
}