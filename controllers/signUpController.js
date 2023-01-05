const signUpService = require("../services/signUpService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

//signUp
const signUp = asyncErrorHandler(async (request, response) => {
  const { name, email, password, phoneNumber } = request.body;
  if (!name || !email || !password || !phoneNumber) {
    let errorMessage = "";
    errorMessage += !name ? "name must be provided! " : "";
    errorMessage += !email ? " email must be provided! " : "";
    errorMessage += !password ? " password must be provided! " : "";
    errorMessage += !phoneNumber ? " phoneNumber must be provided!2 " : "";
    const err = new Error(errorMessage);
    err.statusCode = 400;
    throw err;
  }
  await signUpService.signUp(name, email, password, phoneNumber);
  return response.status(201).json({ message: "userCreated" });
});

module.exports = {
  signUp,
};
