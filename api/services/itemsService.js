require("dotenv").config();
const itemsDao = require("../models/itemsDao");

const getItem = async (itemId) => {
  const item = await itemsDao.getItem(itemId);

  if (item.length === 0) {
    const err = new Error("NOT FOUND : Item No.");
    err.status = 404;
    throw err;
  }

  return item;
};

const getItemsList = async (sort, category, page, search) => {
  const result = await itemsDao.getItemsList(sort, category, page, search);

  if (result.length === 0) {
    const err = new Error("CANNOT FOUND ITEMS");
    err.statusCode = 404;
    throw err;
  }

  return result;
};

module.exports = {
  getItem,
  getItemsList,
};
