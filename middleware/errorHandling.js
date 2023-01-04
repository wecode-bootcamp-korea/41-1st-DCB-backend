const errorHandler = (err, request, response, next) => {
  return response.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = {
  errorHandler,
};
