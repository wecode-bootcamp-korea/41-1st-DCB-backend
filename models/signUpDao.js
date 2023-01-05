const { myDataSource } = require("./myDataSource");

//search if there is a same email address
const emailCheck = async (email) => {
  try {
    const [result] = await myDataSource.query(
      `
    SELECT 
     email 
    FROM users 
    WHERE email = ?`,
      [email]
    );
    return !result ? true : false;
  } catch (err) {
    const error = new Error("Unknown ERROR during email checking");
    error.statusCode = 400;
    throw error;
  }
};

const signUp = async (name, email, hashedPassword, phoneNumber) => {
  try {
    return await myDataSource.query(
      `INSERT INTO users (name, email, password, phone_number) VALUES (?,?,?,?);`,
      [name, email, hashedPassword, phoneNumber]
    );
  } catch (err) {
    const error = new Error("Unknown ERROR during signUp");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = { signUp, emailCheck };
