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
  WHERE c.user_id=?
  GROUP BY c.id;
      `,
    [userId]
  );
  return cartList;
};

const addCart = async (userId, itemId, optionId) => {
  // try {
  return await myDataSource.query(
    `
    INSERT INTO
      carts (user_id, item_id, quantity)
    VALUES (?, ?, 1)
    `,
    [userId, itemId]
  )
  // const result = await myDataSource.query(
  //   `
  //   INSERT INTO
  //     cart_item_options(cart_item_id,option_id)
  //   SELECT carts.id, ? FROM carts WHERE carts.user_id=? AND carts.item_id=?
  //   `,
  //   [userId, itemId, optionId]
  // );
  // }
  // catch (e) {
  //   console.log(e);
  // }

};

const plusQuantity = async (cartId, userId) => {
  const result = await myDataSource.query(
    `
    UPDATE
      carts
    SET
      quantity = quantity + 1
    WHERE
      carts.id = ? AND user_id = ?
    `,
    [cartId, userId]
  )
  return result;
}

const minusQuantity = async (cartId, userId) => {
  const result = await myDataSource.query(
    `
    UPDATE
      carts
    SET
      quantity = quantity - 1
    WHERE
      carts.id = ? AND user_id = ?
    `,
    [cartId, userId]
  )
  return result;
}

const deleteCart = async (cartId) => {
  const result = await myDataSource.query(
    `
    DELETE FROM
      carts
    WHERE
      carts.id = ?
    `,
    [cartId]
  );
  return result;
};

module.exports = {
  getCart,
  addCart,
  plusQuantity,
  minusQuantity,
  deleteCart
};