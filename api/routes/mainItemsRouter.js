const express = require("express");
const router = express.Router();
const mainItemsController = require("../controllers/mainItemsController");

router.get("/", mainItemsController.mainItems);

module.exports = {
  router,
};
