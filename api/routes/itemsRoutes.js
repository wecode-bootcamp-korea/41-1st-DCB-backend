const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/:itemId", itemsController.getItem);
router.get("", itemsController.getItemsList);

module.exports = {
  router,
};
