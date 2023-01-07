const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const validateToken = require("../middleware/auth");


router.get("", validateToken, cartController.getCart);


router.post("", cartController.addCart);

router.patch("", cartController.modifyQuantity);

router.delete("/:cartId", cartController.deleteCart);


module.exports = {
  router
};