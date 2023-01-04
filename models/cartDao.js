const myDataSource = require("./myDataSource");

// 카트 조회 > GET /cart
const getCart = async () => {
  return await myDataSource.query(
    // 도와줘요 종호에모옹~
    `
      SELECT
      c.id as cartId,
      c.user_id as userId,
      c.item_id as itemId,
      c.quantity,
      i.
      
      *
      FROM
      carts
      `,
    []
  );
};

// 카트 선택삭제 > DELETE /cart
const deleteCart = async () => {
  return await myDataSource.query(
    `
    DELETE

    FROM
    carts
    `,
    []
  );
};

// 장바구니 수량변경 > PATCH /cart
const patchCart = async () => {
  return await myDataSource.query(
    `
    UPDATE
carts
    SET

    `,
    []
  );
};



module.exports = {
  getCart,
  deleteCart,
  patchCart
}