const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.log(err.message);
  res.status(status).json({ message: err.message });
};

module.exports = errorHandler;
