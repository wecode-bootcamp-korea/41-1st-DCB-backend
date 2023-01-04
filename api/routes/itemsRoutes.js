const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.get("/:itemsId", itemsController.getItems);


module.exports = {
  router
};