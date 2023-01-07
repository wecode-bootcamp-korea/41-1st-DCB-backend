const cartService = require("../services/cartService");
const { asyncErrorHandler } = require("../middleware/errorHandling");


const getCart = asyncErrorHandler(async (req, res) => {
  const cartList = await cartService.getCart(req.userId);
  return res.status(200).json({ data: cartList });
});



const addCart = asyncErrorHandler(async (req, res) => {
  const added = await cartService.addCart(req.query.itemId, req.query.optionId);
  return res.status(201).json({ data: added });
});


const deleteCart = asyncErrorHandler(async (req, res) => {
  const cartId = req.params.cartId

  await cartService.deleteCart(cartId);
  res.status(204).json({ message: "Success delete cart list" });
});


module.exports = {
  getCart,
  addCart,
  deleteCart
}