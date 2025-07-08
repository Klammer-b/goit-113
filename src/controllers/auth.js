import {
  authorizeWithGoogleOauth,
  getGoogleAuthUrl,
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPasswordEmail,
  resetPassword,
} from '../services/auth.js';

const setupSessionCookies = (session, res) => {
  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully created a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionToken, sessionId } = req.cookies;

  await logoutUser(sessionId, sessionToken);

  res.clearCookie('sessionToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { sessionToken, sessionId } = req.cookies;

  const session = await refreshSession(sessionId, sessionToken);

  setupSessionCookies(session, res);

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetPasswordEmailController = async (req, res) => {
  const { email } = req.body;

  await requestResetPasswordEmail(email);

  res.send({
    status: 200,
    message: 'Successfully sent reset password email!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.send({
    status: 200,
    message: 'Successfully reset password!',
    data: {},
  });
};

export const getGoogleOauthUrlController = (req, res) => {
  const url = getGoogleAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully obtained google auth url!',
    data: {
      url,
    },
  });
};

export const authorizeWithGoogleController = async (req, res) => {
  const session = await authorizeWithGoogleOauth(req.body.code);

  setupSessionCookies(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in user with Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
