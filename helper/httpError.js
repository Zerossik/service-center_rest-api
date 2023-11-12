const httpError = (status, message = '') => {
  const statusError = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    409: 'Conflict',
  };
  const error = new Error(`${message === '' ? statusError[status] : message}`);
  error.status = status;

  return error;
};

module.exports = httpError;
