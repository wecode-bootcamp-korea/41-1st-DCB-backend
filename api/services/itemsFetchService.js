require("dotenv").config();
const itemsFetchDao = require("../models/itemsFetchDao");

const sortCategory = {
  new: "created_at DESC",
  expensive: "price DESC",
  cheap: "price",
};

const itemsFetch = async (request) => {
  let rawQuery;
  let orderString = sortCategory[request.query.sort]
    ? sortCategory[request.query.sort]
    : "created_at DESC";
  console.log(orderString);
  if (request.query.page) {
    rawQuery = `
    SELECT
     i.id,
     i.name,
     i.thumbnail,
     i.price,
     i.contents,
     c.name as category_name 
    FROM items i
    INNER JOIN category c ON i.category_id=c.id 
    WHERE i.category_id=${Number(request.query.page)}
    ORDER BY ${orderString};`;
  } else {
    rawQuery = `
    SELECT
     id,
     name,
     thumbnail,
     price
    FROM items
    ORDER BY ${orderString}
    LIMIT 8;`;
  }

  return await itemsFetchDao.itemsFetch(rawQuery);
};

module.exports = {
  itemsFetch,
};
