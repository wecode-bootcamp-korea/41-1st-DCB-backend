const itemsService = require("../services/itemsService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const sortCategory = {
  new: "created_at DESC",
  expensive: "price DESC",
  cheap: "price",
};

const getItem = asyncErrorHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await itemsService.getItem(itemId);

  return res.status(200).json({ data: item });
});

const getItemsList = asyncErrorHandler(async (request, response) => {
  //DEFAULT ORDER WOULD BE created_at DESC
  let orderString = sortCategory[request.query.sort]
    ? sortCategory[request.query.sort]
    : "created_at DESC";

  //GETTING CATEGORY PAGE BY NUMBER
  let category = request.query.category;

  //DEFAULT PAGE NUMBER WOULD BE 1
  let pageNumber = !request.query.page ? 1 : request.query.page;

  const result = await itemsService.getItemsList(
    orderString,
    category,
    pageNumber
  );
  return response.status(200).json({ data: result });
});

module.exports = {
  getItem,
  getItemsList,
};
