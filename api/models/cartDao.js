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
    INNER JOIN cart_item_options cio ON cio.cart_item_id=c.id
    INNER JOIN options o ON cio.option_id=o.id
    INNER JOIN option_categories oc ON o.category_id=oc.id
    INNER JOIN items i ON i.id=c.item_id
    WHERE c.user_id = ?
    GROUP BY c.id;
    `,
    [userId]
  );
  return cartList;
};

const addCart = async (userId, itemId, optionId) => {
  const queryRunner = myDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const addedCart = await queryRunner.query(
      `
      INSERT INTO
        carts (user_id, item_id, quantity)
      VALUES (?, ?, 1)
      `,
      [userId, itemId]
    );

    const cartId = addedCart.insertId
    console.log(addedCart.insertId);
    await queryRunner.query(
      `
      INSERT INTO
        cart_item_options(cart_item_id, option_id)
      VALUES (?,?)
      `,
      [cartId, optionId]
    );

    const [cart] = await queryRunner.query(
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
      INNER JOIN cart_item_options cio ON cio.cart_item_id=c.id
      INNER JOIN options o ON cio.option_id=o.id
      INNER JOIN option_categories oc ON o.category_id=oc.id
      INNER JOIN items i ON i.id=c.item_id
      WHERE i.id = ?
      GROUP BY i.id;
      `,
      [itemId]
    );

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return cart;

  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    const err = new Error("TRANSACTION  FAILED");
    err.statusCode = 400;
    throw err;
  };
}

const updateQuantity = async (quantity, itemId, userId) => {
  const result = await myDataSource.query(
    `
    UPDATE
      carts
    SET
      quantity = ?
    WHERE
      carts.item_id = ? AND carts.user_id = ?
    `,
    [quantity, itemId, userId]
  )
  return result;
}

const deleteCart = async (itemId, userId) => {
  const result = await myDataSource.query(
    `
    DELETE FROM
      carts c
    WHERE
      c.item_id IN (?);
    `,
    [itemId, userId]
  );
  return result;
};

module.exports = {
  getCart,
  addCart,
  updateQuantity,
  deleteCart
};