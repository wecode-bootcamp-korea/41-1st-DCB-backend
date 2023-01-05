
const { myDataSource } = require("./myDataSource");

const getItems = async (itemsId, options) => {
  try {
    const results = await myDataSource.query(
      `
      SELECT
      i.id as iId,
      i.name as iName,
      i.thumbnail as iThumbnail,
      i.price as iPrice,
      i.contents as iContents,
      i.descriptions as iDescriptions,
      i.brand_id as iBrandId,
      o.item_id as oItemId,
      o.content as oContent,
      o.id as oId
      FROM items i
      RIGHT OUTER JOIN options o ON i.id = o.item_id
      WHERE i.id = ?
      `,
      [itemsId]
    );

    const results2 = await myDataSource.query(
      `
      SELECT
      o.category_id as oCategoryId,
      oc.category as ocCategory
      FROM options o
	  INNER JOIN option_categories oc ON o.category_id = oc.id
      LEFT OUTER JOIN items i ON i.id = o.item_id
      WHERE i.id = ?
UNION
SELECT
      o.category_id as oCategoryId,
      oc.category as ocCategory
      FROM options o
	  INNER JOIN option_categories oc ON o.category_id = oc.id
      RIGHT OUTER JOIN items i ON i.id = o.item_id
      WHERE i.id = ?;
      `,
      [itemsId, itemsId]
    )
    return { results, results2 }; // 여기에 itemsId 랑 options 가 같이 나와야하는데...
  } catch (err) {
    const error = new Error("Error");
    error.statusCode = 404;
    throw error;
  }
};


module.exports = {
  getItems
}