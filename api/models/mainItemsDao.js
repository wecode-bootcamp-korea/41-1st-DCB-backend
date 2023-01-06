const { myDataSource } = require("./myDataSource");

const mainItems = async () => {
  try {
    const newItems = await myDataSource.query(
      `
        SELECT
         id,
         name,
         thumbnail,
         price
        FROM items
        ORDER BY created_at DESC
        LIMIT 8;
         `
    );
    const resonableItems = await myDataSource.query(
      `
        SELECT
         id,
         name,
         thumbnail,
         price
        FROM items
        ORDER BY price
        LIMIT 8;`
    );

    return { newItems, resonableItems };
  } catch (err) {
    console.log(err);
    const error = new Error("Unknwon ERROR in mainItems");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  mainItems,
};
