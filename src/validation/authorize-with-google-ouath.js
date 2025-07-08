import Joi from 'joi';

export const authorizeWithGoogleOAuthValidationSchema = Joi.object({
  code: Joi.string().required(),
});
