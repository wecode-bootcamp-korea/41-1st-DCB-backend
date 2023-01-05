const itemsService = require("../services/itemsService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getItems = asyncErrorHandler(async (req, res) => {

  const { itemsId } = req.params
  const results = await itemsService.getItems(itemsId);

  return res.status(200).json({ data: results })

});


module.exports = {
  getItems
};