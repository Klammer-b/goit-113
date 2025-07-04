import Joi from 'joi';

export const requestResetPasswordEmailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});
