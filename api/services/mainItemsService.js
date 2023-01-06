require("dotenv").config();
const mainItemsDao = require("../models/mainItemsDao");

const mainItems = async () => {
  return await mainItemsDao.mainItems();
};

module.exports = {
  mainItems,
};
