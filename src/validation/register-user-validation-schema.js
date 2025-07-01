import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});
