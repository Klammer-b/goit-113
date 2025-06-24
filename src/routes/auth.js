import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validate-body-middleware.js';
import { registerUserValidationSchema } from '../validation/register-user-validation-schema.js';
import { loginUserValidationSchema } from '../validation/login-user-validation-schema.js';

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
// authRouter.post('/auth/logout');
// authRouter.post('/auth/refresh-session');

export default authRouter;
