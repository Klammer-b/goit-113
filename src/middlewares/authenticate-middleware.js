import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw createHttpError(401, 'Authorization token is missing!');
  }

  const [bearer, token] = authHeader.split(' ');

  if (!(bearer === 'Bearer' && typeof token === 'string')) {
    throw createHttpError(401, 'Auth token must be of type Bearer!');
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found!');
  }

  req.user = user;

  next();
};
