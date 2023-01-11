const { myDataSource } = require("./myDataSource");

const addOrder = async (userId, itemId, optionId, quantity, points) => {
  const orderId = await myDataSource.query(
    `
    INSERT INTO
      orders o
    SELECT
      d
    `,
    [userId, itemId, optionId, quantity, points]
  );
  return result;
};

module.exports = {
  addOrder
}