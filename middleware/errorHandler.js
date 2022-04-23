const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let errorMsg = err.message
    ? err.message
    : 'Something went wrong, try again later';
  let statusCode = res.statusCode ? res.statusCode : 500;
  if (err.name === 'ValidationError') {
    errorMsg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    res.status(400).json({ msg: errorMsg });
  }
  if (err.code && err.code === 11000) {
    errorMsg = `${Object.keys(err.keyValue)} filed has to be unique`;
    res.status(400).json({ msg: errorMsg });
  }
  res.status(statusCode).json({ msg: errorMsg });
};
export default errorHandlerMiddleware;
