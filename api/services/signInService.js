require("dotenv").config();
const signInDao = require("../models/signInDao");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (email, password) => {
  //email not existing
  const user = await signInDao.signIn(email);
  if (!user) {
    const error = new Error("Sign In Again.");
    error.status = 401;
    throw error;
  }

  //password not matching
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    const error = new Error("Sign In Again.");
    error.status = 401;
    throw error;
  }

  const userName = user.name;
  const userPoint = user.point;
  const userCartQuantity = await signInDao.userCartQuantity(user.id);

  //user.id for jwt Payload
  const jwtToken = jwt.sign(user.id, process.env.SECRET_KEY);

  return { userName, userPoint, jwtToken, userCartQuantity };
};

module.exports = {
  signIn,
};
