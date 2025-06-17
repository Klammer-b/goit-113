import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoDBId =
  (idName = 'id') =>
  (req, res, next) => {
    if (!isValidObjectId(req.params[idName])) {
      throw createHttpError(400, `Invalid MongoDB id: ${idName}`);
    }

    next();
  };

//validateMongoDBId('name')
