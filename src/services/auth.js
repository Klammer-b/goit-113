import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
});

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'User already registered!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User login and password does not match!');
  }

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User login and password does not match!');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const session = await Session.create({
    ...createSession(),
    userId: user._id,
  });

  return session;
};

export const logoutUser = async (sessionId, sessionToken) => {
  await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async (sessionId, sessionToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(sessionId);

    throw createHttpError(401, 'Session expired!');
  }

  await Session.findByIdAndDelete(sessionId);

  const newSession = await Session.create({
    ...createSession(),
    userId: session.userId,
  });

  return newSession;
};
