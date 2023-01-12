const { myDataSource } = require("./myDataSource");

const userPoints = async (userId) => {
  try {
    const [result] = await myDataSource.query(
      `
      SELECT
        point
      FROM users
      WHERE id=?`,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error("Unknown Error during points");
    error.statusCode = 400;
    throw error;
  }
};

const createOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const randomNumber = Math.floor(Math.random() * 100000);
  const orderNumber = year + month + day + randomNumber.toString();
  return orderNumber;
};

const order = async (userId, cartId, totalPrice, paymentMethod) => {
  const orderNumber = createOrderNumber();
  const queryRunner = await myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const pay = await queryRunner.query(
      `
      UPDATE
        users
      SET
        point=point-?
      WHERE
        id=? `,
      [totalPrice, userId]
    );
    const orderTable = await queryRunner.query(
      `
      INSERT INTO
        orders(user_id,status_id,order_number)
      VALUES (?,1,?);`,
      [userId, orderNumber]
    );
    const orderTableId = orderTable.insertId;
    const paymentTable = await queryRunner.query(
      `
      INSERT INTO
      payments(order_id,total_price,method_id)
      VALUES(?,?,?);
      `,
      [orderTableId, totalPrice, paymentMethod]
    );
    const itemsTable = await queryRunner.query(
      `INSERT INTO order_items(order_id,item_id,quantity)
      SELECT ?,item_id,quantity FROM carts WHERE id IN (?);`,
      [orderTableId, cartId]
    );
    const [itemsTableStartId] = await queryRunner.query(
      `
      SELECT last_insert_id() as id;
      `
    );
    let itemsIdArray = [];
    const cartIdLength = typeof cartId == "string" ? 1 : cartId.length;
    for (let i = 0; i < cartIdLength; i++) {
      itemsIdArray.push(Number(itemsTableStartId.id) + i);
    }
    if (cartIdLength > 1) {
      for (let i = 0; i < itemsIdArray.length; i++) {
        const itemsOptionTable = await queryRunner.query(
          `INSERT INTO order_item_options(order_item_id,option_id)
      SELECT ?,option_id FROM cart_item_options WHERE cart_item_id=?;  `,
          [itemsIdArray[i], cartId[i]]
        );
      }
    } else {
      const itemsOptionTable = await queryRunner.query(
        `INSERT INTO order_item_options(order_item_id,option_id)
      SELECT ?,option_id FROM cart_item_options WHERE cart_item_id=?;  `,
        [itemsIdArray[0], cartId]
      );
    }
    const deleteItemsTable = await queryRunner.query(
      `
      DELETE FROM carts
      WHERE id IN (?);`,
      [cartId]
    );
    const deleteItemsOptionTable = await queryRunner.query(
      `DELETE FROM cart_item_options WHERE cart_item_id IN (?)`,
      [cartId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("GETTING TRANSACTION FAILED ");
    err.statusCode = 400;
    throw err;
  }
};

const loadOrderStatus = async (userId, oiOrderId) => {
  const result = await myDataSource.query(
    `
      SELECT
        os.id AS osId,
        os.status AS osStatus,
        o.order_number AS oOrderNumber,
        u.id AS uId,
        oi.order_id AS oiOrderId
      FROM
        order_status os
      INNER JOIN
        orders o ON os.id = o.status_id
      INNER JOIN
        users u ON u.id = o.user_id
      INNER JOIN
	    	order_items oi ON oi.order_id = o.id
      WHERE u.id = ? AND oi.order_id = ?
      GROUP BY o.id
    `,
    [userId, oiOrderId]
  );
  return result;
};

module.exports = {
  userPoints,
  order,
  loadOrderStatus
};