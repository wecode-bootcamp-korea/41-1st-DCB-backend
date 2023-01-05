require("dotenv").config();
const itemsDao = require("../models/itemsDao");


const getItems = async (itemsId, options) => {
  const { results, results2 } = await itemsDao.getItems(itemsId, options);
  return { results, results2 };
};

module.exports = {
  getItems
};