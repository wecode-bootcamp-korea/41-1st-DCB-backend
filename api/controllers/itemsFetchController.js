const itemsFetchService = require("../services/itemsFetchService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const itemsFetch = asyncErrorHandler(async (request, response) => {
  const result = await itemsFetchService.itemsFetch(request);
  return response.status(200).json({ data: result });
});

module.exports = {
  itemsFetch,
};
