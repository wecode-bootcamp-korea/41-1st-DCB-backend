const signInService = require("../services/signInService");
const { asyncErrorHandler } = require("../middleware/errorHandling");

const signIn = asyncErrorHandler(async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    let errorMessage = "";
    errorMessage += !email ? " email must be provided! " : "";
    errorMessage += !password ? " password must be provided! " : "";
    const err = new Error(errorMessage);
    err.statusCode = 400;
    throw err;
  }

  const { userName, userPoint, jwtToken, userCartQuantity } =
    await signInService.signIn(email, password);

  return response.status(200).json({
    name: userName,
    point: userPoint,
    accessToken: jwtToken,
    userCartQuantity: userCartQuantity,
  });
});

module.exports = {
  signIn,
};
