require("dotenv").config();
const itemsDao = require("../models/itemsDao");


const getItems = async (itemsId) => {
  return await itemsDao.getItems(itemsId);
};

module.exports = {
  getItems
};