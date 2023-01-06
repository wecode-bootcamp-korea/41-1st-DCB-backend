const { myDataSource } = require("./myDataSource");


const getCart = async (userId) => {
  const cartList = await myDataSource.query(
    `
  SELECT
    c.id AS cId,
    c.quantity AS cQuantity,
    c.user_id AS cUserId,
    c.item_id AS cItemId,
    i.name AS iName,
    i.thumbnail AS iThumbnail,
    i.price AS iPrice,
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


// 카트 추가
const addCart = async (itemId, optionId) => {
  const added = await myDataSource.query(
    `
    SELECT
      i.id AS iId,
      i.name AS iName,
      i.thumbnail AS iThumbnail,
      i.price AS iPrice,
      
      JSON_ARRAYAGG(
      JSON_OBJECT(
      "option_id",o.item_id,
      "option_name",o.content 
      )
      ) AS optionDescription
    FROM items i
    INNER JOIN options o ON o.item_id = i.id
    WHERE i.id = ? AND o.id = ?
    `,
    [itemId, optionId]
  );
  return added;
};







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
  addCart,
  // updateCart,
  // deleteCart,
  // deleteAllCart
};