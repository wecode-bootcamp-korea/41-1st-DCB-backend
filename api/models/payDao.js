const { myDataSource } = require("./myDataSource");

const addOrder = async (userId, itemId, optionId, quantity, points) => {
  const orderId = await myDataSource.query(
    `
    INSERT INTO
      orders o (user_id, status_id, order_number)
    SELECT
      users.id, order_status.id, 
    `,
    [userId, itemId, optionId, quantity, points]
  );
  return result;
};

module.exports = {
  addOrder
}