
const { myDataSource } = require("./myDataSource");

const getItems = async (itemsId) => {
  try {
    const items = await myDataSource.query(
      `
      SELECT
        i.id,
        i.name as product_name,
        i.thumbnail,
        i.price,
        c.name AS product_category,
        i.contents,
        i.descriptions,
        b.name AS brand_name,
        JSON_ARRAYAGG(
          JSON_OBJECT("option_id",o.id,"option_content",o.content)
        ) AS options,
        oc.category AS option_category_name,
        oc.id AS option_category_id
      FROM items i
      LEFT JOIN category c ON i.category_id = c.id
      LEFT JOIN brands b ON i.brand_id = b.id
      LEFT JOIN options o ON o.item_id = i.id
      LEFT JOIN option_categories oc ON oc.id = o.category_id
      WHERE i.id = ?
      GROUP BY i.id, oc.category, oc.id;
      `,
      [itemsId]
    );

    return items;

  } catch (err) {
    const error = new Error("Unknown error : getting items");
    error.statusCode = 404;
    throw error;
  }
};


module.exports = {
  getItems
}