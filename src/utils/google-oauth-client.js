import { OAuth2Client } from 'google-auth-library';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import createHttpError from 'http-errors';

const oAuth2Client = new OAuth2Client({
  clientId: getEnvVar(ENV_VARS.GOOGLE__OAUTH_CLIENT_ID),
  redirectUri: getEnvVar(ENV_VARS.GOOGLE__OAUTH_REDIRECT_URI),
  clientSecret: getEnvVar(ENV_VARS.GOOGLE__OAUTH_CLIENT_SECRET),
  projectId: getEnvVar(ENV_VARS.GOOGLE__OAUTH_PROJECT_ID),
});

export const getGoogleOAuthUrl = () =>
  oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

export const getAuthInfo = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens.id_token) {
      throw createHttpError(401);
    }

    const idToken = tokens.id_token;

    const response = await oAuth2Client.verifyIdToken({ idToken });

    return response.getPayload();
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Failed to auth with google');
  }
};
