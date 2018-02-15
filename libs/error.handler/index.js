const errorTypes = require('./error.types');
const errors = require('./errors');

function notFound(req, res, next) {
  res.status(errors.NOT_FOUND.status);
  res.json({
    message: errors.NOT_FOUND.message,
  });
}
function handleError(err, req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  const error = errors[err.message] || errors.SERVER_ERROR;
  res.status(error.status);
  res.json({
    message: error.message,
  });
}
module.exports = {
  notFound,
  handleError,
};
