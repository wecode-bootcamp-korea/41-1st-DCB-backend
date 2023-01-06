const express = require("express");
const router = express.Router();
const itemsFetchController = require("../controllers/itemsFetchController");

router.get("", itemsFetchController.itemsFetch);

module.exports = {
  router,
};
