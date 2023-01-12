const { myDataSource } = require("./myDataSource");

const addOrder = async (userId, itemId, optionId, quantity, points, totalPrice) => {
  const queryRunner = myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const orderId = await queryRunner.query(
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
    const orderItemsId = await queryRunner.query(
      `
      INSERT INTO
        order_items (order_id, item_id, quantity)
      VALUES
      (?, ?, ?)
    `,
      [orderIdResult, itemId, quantity]
    );
    const orderItemsIdResult = orderItemsId.insertId;

    const result = await queryRunner.query(
      `
      INSERT INTO
        order_item_options (order_item_id, option_id)
      VALUES
      (?, ?)
      `,
      [orderItemsIdResult, optionId]
    );

    // 결과문 출력해서 보여주려면 아래 쿼리문 작성
    // const [result] = await queryRunner.query(
    //   `
    //   SELECT
    //   FROM
    //   WHERE
    //   GROUP BY
    //   `,
    //   []
    // );

    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("TRANSACTION  FAILED");
    err.statusCode = 400;
    throw err;
  };
};

const loadPayStatus = async (userId, osId) => {
  const queryRunner = myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const payStatus = await queryRunner.query(
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
      WHERE u.id = ? AND os.id = ?
      GROUP BY o.id
      `,
      [userId, osId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("TRANSACTION  FAILED");
    err.statusCode = 400;
    throw err;
  };
};

module.exports = {
  addOrder,
  loadPayStatus
}