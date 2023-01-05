const myDataSource = require("../models/myDataSource");

// carts, item_id, cart_item_id, users(id)

// 카트 조회 > GET /cart      // 카트에 물건이 없을땐? 없다고 표시!
const getCart = async (userId) => {
  const cartList = await myDataSource.query(
    `
      SELECT
      c.id AS cartId,
      c.quantity AS quantity,
      c.user_id AS userId,
      c.item_id AS itemId,
      i.id AS itemId,
      u.id AS userId,
      cio.cart_item_id AS cartItemId
      FROM carts
      INNER JOIN items i ON i.id = c.item_id
      INNER JOIN users u ON u.id = c.user_id
      INNER JOIN cart_item_options cio ON cio.cart_item_id = c.id
      `,
    [userId]
  );
  return cartList;
};

// // 결제하기로 토스



// // 카트 추가



// // 장바구니 수량변경 > PATCH /cart    //item_id
// const updateCart = async () => {
//   // if {
//   return await myDataSource.query(
//     `
//       UPDATE carts
//       SET quantity = quantity+1
//       WHERE 1  
//       `
//   )
//   // } else if {
//   return await myDataSource.query(
//     `
//       UPDATE carts
//       SET quantity = quantity-1
//       WHERE 1
//       `
//   )
//   // }
// };

// // 아니면 그냥 변수 두번 설정해서 각각 + - 으로 코드작성



// // 카트 선택삭제 > DELETE /cart
// const deleteCart = async () => {
//   return await myDataSource.query(
//     `
//     DELETE
//     FROM
//     carts
//     WHERE 체크한것만 삭제해야 하는데 그 체크를 조건화 하는걸 어카는지 모루겠네
//     `
//   );
// };


// // 카트 전체삭제




module.exports = {
  getCart,
  // deleteCart,
  // updateCart,
};