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

const userCartQuantity = async (userId) => {
  try {
    const cartList = await myDataSource.query(
      `
      SELECT
       *
      FROM
      carts
      WHERE
      user_id=?
        `,
      [userId]
    );
    return cartList.length;
  } catch (err) {
    console.log(err);
    const error = new Error("Unknown ERROR during Cart Quantity");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  signIn,
  userCartQuantity,
};
