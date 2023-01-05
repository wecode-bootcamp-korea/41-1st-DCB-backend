const itemsService = require("../services/itemsService");

const getItems = async (req, res) => {
  try {
    const { itemsId } = req.params
    const { results, results2 } = await itemsService.getItems(itemsId);



    return res.status(200).json({ data: results, option: results2 })
  } catch (err) {
    return res.status(err.statusCode || 404).json({ message: err.message })
  }
};


module.exports = {
  getItems
};