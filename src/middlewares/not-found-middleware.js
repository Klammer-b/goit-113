export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    message: 'Not Found',
    status: 404,
  });
};
