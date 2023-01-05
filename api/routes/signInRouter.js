const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInController");

router.post("/", signInController.signIn);

module.exports = {
  router,
};
