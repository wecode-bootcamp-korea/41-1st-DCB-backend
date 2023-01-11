const { myDataSource } = require("./myDataSource");

const addOrder = async (userId, itemId, optionId, quantity, points, orderNum) => {

  const orderId = await myDataSource.query(
    `
    INSERT INTO
      orders (user_id, status_id)
    SELECT
      u.id AS userId,
      os.id AS orderStatusId
    FROM
      users u
    RIGHT JOIN
      order_status os ON os.id = u.id
    WHERE
      u.id = ?
	  GROUP BY u.id = 1
    `,
    [userId]
  );
  const orderIdResult = orderId.insertId;

  const orderItemsId = await myDataSource.query(
    `
    INSERT INTO
      order_items (order_id, item_id, quantity)
    VALUES
      (?, ?, ?)
    `,
    [orderIdResult, itemId, quantity]
  );
  const orderItemsIdResult = orderItemsId.insertId;

  const orderItemOptionsId = await myDataSource.query(
    `
    INSERT INTO
      order_item_options (order_item_id, option_id)
    VALUES
      (?, ?)
    `,
    [orderItemsIdResult, optionId]
  );


  return result;
};

module.exports = {
  addOrder
}