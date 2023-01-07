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


const modifyQuantity = asyncErrorHandler(async (req, res) => {
  const { cartId } = req.body;
  const { quantity } = req.body;

  await cartService.modifyQuantity(req.userId, cartId, quantity);
  const list = await cartService.Lists(req.userId);

  return res.status(201).json({ data: list });
})


const deleteCart = asyncErrorHandler(async (req, res) => {
  await cartService.deleteCart(req.params.cartId);
  return res.status(200).json({ message: "delete complete" });
});


module.exports = {
  getCart,
  addCart,
  modifyQuantity,
  deleteCart
}