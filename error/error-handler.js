// If you call next() with an error after you have started writing the response (for example, if you encounter an error while streaming the response to the client) the Express default error handler closes the connection and fails the request.
// So when you add a custom error handler, you must delegate to the default Express error handler, when the headers have already been sent to the client:

function errorHandler (err, req, res, next) {
  console.log(err);
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).end();
}

module.exports = errorHandler;
