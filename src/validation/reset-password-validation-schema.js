import Joi from 'joi';

export const resetPasswordValidationSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required().min(6),
});
