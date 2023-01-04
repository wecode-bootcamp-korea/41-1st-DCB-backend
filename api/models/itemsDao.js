
const { myDataSource } = require("./myDataSource");

const getItems = async (itemsId) => {
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
      i.brand_id as iBrandId
      FROM items i
      WHERE i.id =?
      `,
      [itemsId]
    );
    return results;
  } catch (err) {
    const error = new Error("Error");
    error.statusCode = 404;
    throw error;
  }
};


module.exports = {
  getItems
}