import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validate-body-middleware.js';
import { registerUserValidationSchema } from '../validation/register-user-validation-schema.js';
import { loginUserValidationSchema } from '../validation/login-user-validation-schema.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/request-reset-password-email-validation-schema.js';
import { resetPasswordValidationSchema } from '../validation/reset-password-validation-schema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);
authRouter.post('/auth/refresh-session', refreshSessionController);

authRouter.post(
  '/auth/request-reset-password-email',
  validateBody(requestResetPasswordEmailValidationSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-password',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;
