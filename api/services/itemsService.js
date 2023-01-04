require("dotenv").config();
const itemsDao = require("../models/itemsDao");


const getItems = async (itemsId) => {
  const results = await itemsDao.getItems(itemsId);
  return results;
};

module.exports = {
  getItems
};