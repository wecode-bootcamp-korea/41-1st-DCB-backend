const { myDataSource } = require("./myDataSource");

const signIn = async (email) => {
  try {
    const [user] = await myDataSource.query(
      `SELECT 
        id,
        name,
        password,
        point 
       FROM users 
       WHERE email =?
        `,
      [email]
    );
    return user;
  } catch (err) {
    const error = new Error("Unknown ERROR during Email checking");
    error.statusCode = 400;
    throw error;
  }
};

const userCartList = async (userId) => {
  try {
    const cartList = await myDataSource.query(
      `
      SELECT
       c.id,
       c.quantity,
       c.user_id,
       c.item_id,
       i.name,
       i.thumbnail,
       i.price,
       JSON_ARRAYAGG(
        JSON_OBJECT(
          "option_id",cio.option_id,
          "categoryName",oc.category,
          "content",o.content
          )
          ) AS optionDescription   
      FROM carts c
      INNER JOIN cart_item_options cio 
      ON cio.cart_item_id=c.id
      INNER JOIN options o
      ON cio.option_id=o.id
      INNER JOIN option_categories oc
      ON o.category_id=oc.id
      INNER JOIN items i
      ON i.id=c.item_id
      WHERE c.user_id=?
      GROUP BY c.id;
        `,
      [userId]
    );
    return cartList;
  } catch (err) {
    console.log(err);
    const error = new Error("Unknown ERROR during Cart Quantity");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  signIn,
  userCartList,
};
