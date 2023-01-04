require("dotenv").config();
const itemsDao = require("../models/itemsDao");


const getItems = async (itemsId, options) => {
  console.log(2)
  const { results, results2 } = await itemsDao.getItems(itemsId, options);
  return { results, results2 };
};

module.exports = {
  getItems
};