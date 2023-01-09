const itemsService = require("../services/itemsService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const getItem = asyncErrorHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await itemsService.getItem(itemId);

  return res.status(200).json({ data: item });
});

const getItemsList = asyncErrorHandler(async (request, response) => {
  //GETTING SORT CONDITION
  const sort = !request.query.sort ? "default" : request.query.sort;

  //GETTING CATEGORY PAGE BY NUMBER
  const category = request.query.category;

  //DEFAULT PAGE NUMBER IS 1
  const page = !request.query.page ? 1 : request.query.page;

  //GETTING SEARCH STRING
  const search = request.query.search;

  const result = await itemsService.getItemsList(sort, category, page, search);
  return response.status(200).json({ data: result });
});

module.exports = {
  getItem,
  getItemsList,
};
