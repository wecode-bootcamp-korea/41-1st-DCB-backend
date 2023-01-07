require("dotenv").config();
const itemsDao = require("../models/itemsDao");

//WHERE QUERY
const whereQuery = {
  getItemById: `WHERE i.id = ? `,

  //IF YOU WANT TO SEE CATEGORY PAGES
  categoryPage: (category) => {
    return `WHERE i.category_id=${Number(category)} `;
  },

  theOtherPages: `WHERE TRUE `,
};

//DEFAULT GROUP BY QUERY
const groupByQuery = `GROUP BY i.id, oc.category, oc.id `;

//ORDER BY QUERY
const orderByQuery = (orderString) => {
  return `ORDER BY ${orderString} `;
};

//LIMIT QUERY
const limitQuery = {
  //DEFAULT LIMIT WOULD BE 8
  mainPage: `LIMIT 8;`,

  //PAGINATION IN OTHER PAGES
  theOtherPages: (pageNumber) => {
    return `LIMIT ${20 * (pageNumber - 1)},20;`;
  },
};

let extraQuery;

const getItem = async (itemId) => {
  extraQuery = whereQuery.getItemById + groupByQuery;
  const item = await itemsDao.getItem(itemId, extraQuery);

  if (item.length === 0) {
    const err = new Error("NOT FOUND : Item No.");
    err.status = 404;
    throw err;
  }

  return item;
};

const getItemsList = async (orderString, category, pageNumber) => {
  extraQuery =
    (category > 0
      ? whereQuery.categoryPage(category)
      : whereQuery.theOtherPages) +
    groupByQuery +
    orderByQuery(orderString) +
    (!category ? limitQuery.mainPage : limitQuery.theOtherPages(pageNumber));

  return await itemsDao.getItemsList(extraQuery);
};

module.exports = {
  getItem,
  getItemsList,
};
