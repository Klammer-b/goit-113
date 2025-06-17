export const validateBody = (schema) => async (req, res, next) => {
  await schema.validateAsync(req.body, {
    abortEarly: false,
    convert: false,
    allowUnknown: false,
  });

  next();
};
