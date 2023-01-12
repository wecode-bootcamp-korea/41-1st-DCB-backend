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

const createOrder = async (userId, cartId, totalPrice, paymentMethod) => {
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
    const cartIdLength = cartId.length;
    for (let i = 0; i < cartIdLength; i++) {
      itemsIdArray.push(Number(itemsTableStartId.id) + i);
    }

    for (let i = 0; i < itemsIdArray.length; i++) {
      const itemsOptionTable = await queryRunner.query(
        `
       INSERT INTO order_item_options(order_item_id,option_id)
       SELECT ?,option_id FROM cart_item_options WHERE cart_item_id=?;  `,
        [itemsIdArray[i], cartId[i]]
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

const getOrderStatus = async (userId) => {
  const result = await myDataSource.query(
    `
    SELECT
    o.user_id as userId,
    o.created_at as orderCreateAt,
    os.status as orderStatus,
    o.order_number as orderNumber,
    p.total_price as totalPrice,
    pm.method as paymentMethod,
   JSON_ARRAYAGG(
    JSON_OBJECT(
    "item_id",oi.item_id,
    "item_name",i.name,
    "item_thumbnail",i.thumbnail,
    "quantity",oi.quantity,
    "item_price",i.price,
    "option_category",opc.category,
    "option",op.content)
    )as itemLists
    FROM orders o
    LEFT JOIN order_status os ON o.status_id=os.id
    LEFT JOIN payments p ON p.order_id=o.id
    LEFT JOIN payment_methods pm ON p.method_id=pm.id
    LEFT JOIN order_items oi ON oi.order_id=o.id
    LEFT JOIN items i ON oi.item_id=i.id
    LEFT JOIN order_item_options oio ON oio.order_item_id=oi.id
    LEFT JOIN options op ON op.id=oio.option_id
    LEFT JOIN option_categories opc ON opc.id=op.category_id
    WHERE o.user_id=?
    GROUP BY o.order_number,o.user_id,os.status,o.created_at,p.total_price,pm.method;
    `,
    [userId]
  );
  return result;
};

module.exports = {
  userPoints,
  createOrder,
  getOrderStatus,
};
