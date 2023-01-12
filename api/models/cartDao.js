const { myDataSource } = require("./myDataSource");

const getCart = async (userId) => {
  const cartList = await myDataSource.query(
    `
    SELECT
      c.id AS cartId,
      c.quantity AS cartQuantity,
      c.user_id AS cartUserId,
      c.item_id AS cartItemId,
      i.name AS itemsName,
      i.thumbnail AS itemsThumbnail,
      i.price AS itemsPrice,
      JSON_ARRAYAGG(
      JSON_OBJECT(
      "option_id",cio.option_id,
      "categoryName",oc.category,
      "content",o.content
      )
      ) AS optionDescription
    FROM carts c
    LEFT JOIN cart_item_options cio ON cio.cart_item_id=c.id
    LEFT JOIN options o ON cio.option_id=o.id
    LEFT JOIN option_categories oc ON o.category_id=oc.id
    LEFT JOIN items i ON i.id=c.item_id
    WHERE c.user_id = ?
    GROUP BY c.id;
    `,
    [userId]
  );
  return cartList;
};
const addCart = async (userId, itemId, optionId, quantity) => {
  const queryRunner = myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const addedCart = await queryRunner.query(
      `
      INSERT INTO
        carts (user_id, item_id, quantity)
      SELECT ?,?,? 
      WHERE NOT EXISTS(
        SELECT 
          c.id,
          c.user_id, 
          c.item_id,
          cio.cart_item_id,
          cio.option_id
        FROM carts c
        LEFT JOIN cart_item_options cio ON cio.cart_item_id=c.id 
        WHERE c.user_id=? AND c.item_id=? AND cio.option_id=?
      FOR UPDATE);     
      `,
      [userId, itemId, quantity, userId, itemId, optionId]
    );
    const cartId = addedCart.insertId;
    if (cartId != 0 && optionId) {
      await queryRunner.query(
        `
      INSERT INTO
        cart_item_options(cart_item_id, option_id)
      VALUES (?,?)
      ON DUPLICATE KEY UPDATE
       cart_item_id = ?, option_id = ?;
      `,
        [cartId, optionId, cartId, optionId]
      );
    }
    const cart = await queryRunner.query(
      `
      SELECT
        c.id AS cartId,
        c.quantity AS cartQuantity,
        c.user_id AS cartUserId,
        c.item_id AS cartItemId,
        i.name AS itemsName,
        i.thumbnail AS itemsThumbnail,
        i.price AS itemsPrice,
        JSON_ARRAYAGG(
        JSON_OBJECT(
        "option_id",cio.option_id,
        "categoryName",oc.category,
        "content",o.content
        )
        ) AS optionDescription
      FROM carts c
      LEFT JOIN cart_item_options cio ON cio.cart_item_id=c.id
      LEFT JOIN options o ON cio.option_id=o.id
      LEFT JOIN option_categories oc ON o.category_id=oc.id
      LEFT JOIN items i ON i.id=c.item_id
      WHERE i.id = ?
      GROUP BY c.id;
      `,
      [itemId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return cart;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("TRANSACTION  FAILED AT ADD");
    err.statusCode = 400;
    throw err;
  }
};
const updateQuantity = async (userId, cartId, quantity) => {
  const result = await myDataSource.query(
    `
    UPDATE
      carts
    SET
      quantity = ?
    WHERE
      carts.id = ? AND carts.user_id = ?
    `,
    [quantity, cartId, userId]
  );
  return result;
};
const deleteCart = async (cartId, userId) => {
  const queryRunner = myDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
    DELETE FROM
      cart_item_options
    WHERE
      cart_item_options.cart_item_id IN (?);`,
      [cartId]
    );
    const result = await queryRunner.query(
      `
    DELETE FROM
      carts c
    WHERE
      c.id IN (?) AND c.user_id = ?;
    `,
      [cartId, userId]
    );
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    const err = new Error("TRANSACTION  FAILED AT DELETE");
    err.statusCode = 400;
    throw err;
  }
};
module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart,
};