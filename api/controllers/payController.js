const payService = require("../services/payService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

// const getCart = asyncErrorHandler(async (req, res) => {
//   const cartList = await cartService.getCart(req.userId);

//   return res.status(200).json({ data: cartList });
// });

// const addCart = asyncErrorHandler(async (req, res) => {
//   const addedCart = await cartService.addCart(req.userId, req.body.itemId, req.body.optionId, req.body.quantity);
//   console.log(req)
//   return res.status(201).json({ data: addedCart });
// });


module.exports = {
  // getItem
};