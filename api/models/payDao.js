const { myDataSource } = require("./myDataSource");

const addOrder = async (userId) => {
  const result = await myDataSource.query(
    `
    INSERT INTO
      orders o (userId, statusId)
    SELECT
      
    FROM
      users u AND order_status os
    WHERE
    `,
    [userId]
  );
  return result;
};


module.exports = {
  addOrder
}