const cartService = require("../services/cartService");

// 카트 조회 > GET /cart
// res.status(200) - 리스트 성공적으로 가져옴
// res.status(401)
const getCart = async (req, res) => {
  const userId = req.users.id
  try {
    await cartService.getCart(userId);
    res.status(200).json({ message: "Success get cart list" });
  } catch (error) {
    console.log(error || 401);
    res.json({ message: "Error getting cart list" });
  }
};


// 장바구니 추가 > POST cart
// res.status() - 성공적으로 추가함
// res.status()
const addCart = async (req, res) => {
  const blablalba = ddd
}

// 장바구니 수량변경 > PATCH /cart
// res.status(201)
const updateCart = async (req, res) => {
  const { quantity, itemsId } = req.body
  const userId = req.users.id

  await cartService.updateCart(quantity, itemsId, userId);
  res.status(201).json({ message: "Success updating quantities" });
};

// 카트 선택삭제 > DELETE /cart
// res.status(204)
const deleteCart = async (req, res) => {
  const cartId = req.params.cartId
  const userId = req.users.id

  await cartService.deleteCart(cartId, userId);
  res.status(204).json({ message: "Success delete cart list" });
};


// 카트 전체삭제 > DELETE /ALL
// res.status(204)
const deleteAllCart = async (req, res) => {
  const /////////
}

module.exports = {
  getCart,
  deleteCart,
  updateCart
}