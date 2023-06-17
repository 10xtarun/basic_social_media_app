const ApiError = require("../utils/ApirError");

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let HTTPStatusCode = 400; // err instanceof MongooseError ? 400 : 422

  const responseObject = {
    message: "Internal Server Error",
    error: err.message ? err.message : err.toString(),
  };

  if (err instanceof ApiError) {
    HTTPStatusCode = err.statusCode;
    responseObject.error = err.err;
    responseObject.message = err.message;
  }

  return res
    .status(HTTPStatusCode)
    .json({
      ...responseObject,
    });
};
