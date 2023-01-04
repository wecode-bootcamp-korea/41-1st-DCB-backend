const itemsService = require("../services/itemsService");

// 상세페이지 가져오기
const getItems = async (req, res) => {
  try {
    const { itemsId } = req.params
    const results = await itemsService.getItems(itemsId);
    return res.status(200).json({ data: results })
  } catch (err) {
    return res.status(err.statusCode || 404).json({ message: err.message })
  }
};


module.exports = {
  getItems
};