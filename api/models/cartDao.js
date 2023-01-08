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
     "option_id",cartItemOptions.option_id,
     "categoryName",optionCategory.category,
     "content",options.content
     )
     ) AS optionDescription  
  FROM carts c
  INNER JOIN cart_item_options cio ON cartItemOptions.cart_item_id=cart.id
  INNER JOIN options o ON cartItemOptions.option_id=options.id
  INNER JOIN option_categories oc ON options.category_id=optionCategory.id
  INNER JOIN items i ON items.id=cart.item_id
  WHERE cart.user_id=?
  GROUP BY cart.id;
      `,
    [userId]
  );
  return cartList;
};

const addCart = async (userId, itemId, optionId) => { // select > update
  const added = await myDataSource.query(
    // `
    // SELECT
    //   i.id AS itemId,
    //   i.name AS itemName,
    //   i.thumbnail AS itemThumbnail,
    //   i.price AS itemPrice,
    //   JSON_ARRAYAGG(
    //   JSON_OBJECT(
    //   "option_id",option.item_id,
    //   "option_name",option.content
    //   )
    //   ) AS optionDescription
    // FROM items i
    // INNER JOIN options o ON option.item_id = items.id
    // WHERE items.id = ? AND options.id = ?
    // `,
    `
    INSERT INTO
      carts (user_id, item_id, option_id, quantity)
    VALUES (?,?,1)
    `,
    [userId, itemId, optionId]
  );
  return added;
};

const plusQuantity = async (userId, cartId) => { //upsert 빼자
  const result = await myDataSource.query(
    // `
    // INSERT INTO
    //   carts (quantity,user_id,item_id)
    // VALUES
    //   (1,?,?)
    // ON DUPLICATE KEY UPDATE
    //   quantity = quantity + 1,user_id=?,item_id=?
    // WHERE
    //   carts.id = ? AND carts.user_id = ?;
    // `,
    `
    UPDATE
      carts
    SET
      quantity = count + 1
    WHERE
      carts.id = ? AND users.id = ?
    `,
    [cartId, userId]
  )
  return result;
}

const minusQuantity = async (userId, cartId) => {
  const result = await myDataSource.query(
    `
    UPDATE
      carts
    SET
      quantity = count - 1
    WHERE
      carts.id = ? AND users.id = ?
    `,
    [userId, cartId]
  )
  return result;
}

const deleteCart = async (cartId) => { // 선택한 cartId를 배열로 보내주신다 -세윤님 > 그럼 cartId 를 배열로 받을 수 있나?
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