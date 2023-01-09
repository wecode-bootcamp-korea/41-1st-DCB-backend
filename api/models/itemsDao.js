const { myDataSource } = require("./myDataSource");
const itemsQuery = require("./itemsQuery");

const getItem = async (itemId) => {
  try {
    const query = await itemsQuery.getItemOrList();
    const item = await myDataSource.query(query, [itemId]);

    return item;
  } catch (err) {
    const error = new Error("Unknown error : getting item");
    error.statusCode = 400;
    throw error;
  }
};

const getItemsList = async (sort, category, page, search) => {
  try {
    const query = await itemsQuery.getItemOrList(sort, category, page, search);
    return await myDataSource.query(query);
  } catch (err) {
    const error = new Error("Unknwon ERROR in itemsList");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getItem,
  getItemsList,
};
