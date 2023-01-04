require("dotenv").config();
const signUpDao = require("../models/signUpDao");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (name, email, password, phoneNumber) => {
  const result = await signUpDao.emailCheck(email);

  if (!result) {
    const err = new Error("Email already exists");
    err.statusCode = 409;
    throw err;
  }

  const saltOrRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  const signUp = await signUpDao.signUp(
    name,
    email,
    hashedPassword,
    phoneNumber
  );
  return signUp;
};
module.exports = {
  signUp,
};
