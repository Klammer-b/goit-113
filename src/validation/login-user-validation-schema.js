import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});
