const itemsService = require("../services/itemsService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getItem = asyncErrorHandler(async (req, res) => {

  const { itemId } = req.params
  const item = await itemsService.getItem(itemId);

  return res.status(200).json({ data: item })

});


module.exports = {
  getItem
};