const mainItemsService = require("../services/mainItemsService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const mainItems = asyncErrorHandler(async (request, response) => {
  const { newItems, resonableItems } = await mainItemsService.mainItems();
  return response
    .status(200)
    .json({ newItems: newItems, resonableItems: resonableItems });
});

module.exports = {
  mainItems,
};
